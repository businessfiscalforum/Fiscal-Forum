"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

/* ---------- SCORING CONSTANTS ---------- */
const GOOD_HIT_POINTS = 10;
const BAD_HIT_POINTS = -20;
const GOOD_SKIP_PENALTY = -10;
const GAME_OVER_SCORE = 0;
const WIN_SCORE = 100;

/* ---------- OBSTRUCTION CONTROL ---------- */
const MAX_OBSTACLES = 4;
const OBSTACLE_WIDTH = 220;
const OBSTACLE_HEIGHT = 55;
const MIN_VERTICAL_GAP = 90;
const MIN_HORIZONTAL_GAP = 280;
const SPEED_INCREMENT_PER_SPAWN = 0.1;
const MAX_SPEED = 11.0;
const BG_SPEED = 1.7;
const PLAYER_SPEED = 6.5;

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "good" | "bad";
  label: string;
  speed: number;
}

const goodItems = [
  "Start Early", "Budgeting Monthly", "Emergency Fund", "Diversified Investing",
  "Debt Payoff", "Tax Planning", "Career Growth", "Limiting Debt",
  "Term Insurance", "Living Modestly", "Continuous Learning",
  "Index Funds", "Retirement Accounts", "Health Insurance", "Business Equity",
  "Delay gratification", "Limit lifestyle", "REITs", "Corporate Bonds", "Think long-term",
  "Sovereign Gold", "Target Funds", "Diversify risk", "Research assets", "Network effectively",
  "Optimize taxes", "Private equity", "Venture capital", "Value stocks"
];

const badItems = [
  "Delaying Savings", "Overspending", "High-Interest Debt", "Panic Selling",
  "Lifestyle Inflation", "Emotional Spending", "Maxing Cards",
  "Skipping Insurance", "Status Chasing", "Impulsive Buying",
  "Luxury Cars", "Fast Fashion", "Lottery Tickets", "Speculative Coins",
  "No Plan", "Penny stocks", "Chit funds", "Ponzi schemes",
  "Skipping audits", "Single-stock focus", "No insurance", "Chasing hype", "Blindly trusting",
  "Naked options", "High-Risk Speculation", "Poor Value Tools", "Unregulated bonds",
  "P2P lending", "ULIP plans"
];

export default function GameZone() {
  const router = useRouter();
  const [score, setScore] = useState(20);
  const [gameState, setGameState] = useState<"instructions" | "playing" | "win" | "lose">("instructions");
  const [scoreChangedType, setScoreChangedType] = useState<"up" | "down" | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game state refs (for safe usage inside high frequency canvas loop)
  const gameOverRef = useRef(true);
  const scoreRef = useRef(20);
  const goodSpeedRef = useRef(4);
  const badSpeedRef = useRef(4);
  const bgXRef = useRef(0);
  const decisionIndexRef = useRef(0);
  const roundRef = useRef(1);
  const moveUpRef = useRef(false);
  const moveDownRef = useRef(false);

  const playerRef = useRef({ x: 80, y: 160, w: 70, h: 110 });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const decisionQueueRef = useRef<{ label: string; type: "good" | "bad" }[]>([]);

  // Asset refs
  const playerImgRef = useRef<HTMLImageElement | null>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const goodSoundsRef = useRef<{ audio: HTMLAudioElement; duration: number }[]>([]);
  const badSoundsRef = useRef<{ audio: HTMLAudioElement; duration: number }[]>([]);
  const gameOverSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  const animationFrameId = useRef<number | null>(null);
  const spawnTimeoutId = useRef<NodeJS.Timeout | null>(null);

  // Initialize assets and sounds
  useEffect(() => {
    // Images
    const pImg = new window.Image();
    pImg.src = "/game-zone/vijay.jpeg";
    playerImgRef.current = pImg;

    const bImg = new window.Image();
    bImg.src = "/game-zone/galaxy.jpg";
    bgImgRef.current = bImg;

    // Audio
    goodSoundsRef.current = [
      { audio: new Audio("/game-zone/airhorn.mp3"), duration: 600 },
      { audio: new Audio("/game-zone/punjabi.mp3"), duration: 1200 }
    ];
    badSoundsRef.current = [
      { audio: new Audio("/game-zone/Fahhhh.mp3"), duration: 800 },
      { audio: new Audio("/game-zone/getfromytcom-the-angriest-scamme-1.mp3"), duration: 2000 },
      { audio: new Audio("/game-zone/Voicy_Hey_Ma_Mataji.mp3"), duration: 3000 }
    ];
    
    // Set volumes
    [...goodSoundsRef.current, ...badSoundsRef.current].forEach(s => {
      s.audio.volume = 0.5;
    });

    gameOverSoundRef.current = new Audio("/game-zone/y2mate_HOnnyD0.mp3");
    if (gameOverSoundRef.current) gameOverSoundRef.current.volume = 0.7;

    winSoundRef.current = new Audio("/game-zone/wow.mp3");
    if (winSoundRef.current) winSoundRef.current.volume = 0.7;

    // Cleanup on unmount
    return () => {
      cleanupGame();
      stopAllAudio();
    };
  }, []);

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;
      if (e.key === "ArrowUp") {
        moveUpRef.current = true;
        e.preventDefault();
      }
      if (e.key === "ArrowDown") {
        moveDownRef.current = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") moveUpRef.current = false;
      if (e.key === "ArrowDown") moveDownRef.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const cleanupGame = () => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    if (spawnTimeoutId.current) clearTimeout(spawnTimeoutId.current);
  };

  const stopAllAudio = () => {
    try {
      if (gameOverSoundRef.current) {
        gameOverSoundRef.current.pause();
        gameOverSoundRef.current.currentTime = 0;
      }
      if (winSoundRef.current) {
        winSoundRef.current.pause();
        winSoundRef.current.currentTime = 0;
      }
      goodSoundsRef.current.forEach(s => {
        s.audio.pause();
        s.audio.currentTime = 0;
      });
      badSoundsRef.current.forEach(s => {
        s.audio.pause();
        s.audio.currentTime = 0;
      });
    } catch (e) {}
  };

  const playRandomGoodSound = () => {
    const sounds = goodSoundsRef.current;
    if (!sounds.length) return;
    const item = sounds[Math.floor(Math.random() * sounds.length)];
    try {
      item.audio.currentTime = 0;
      item.audio.play().catch(e => console.log("Audio play error:", e));
      setTimeout(() => {
        try { item.audio.pause(); } catch(e) {}
      }, item.duration);
    } catch (err) {
      console.log("Audio exception:", err);
    }
  };

  const playRandomBadSound = () => {
    const sounds = badSoundsRef.current;
    if (!sounds.length) return;
    const item = sounds[Math.floor(Math.random() * sounds.length)];
    try {
      item.audio.currentTime = 0;
      item.audio.play().catch(e => console.log("Audio play error:", e));
      setTimeout(() => {
        try { item.audio.pause(); } catch(e) {}
      }, item.duration);
    } catch (err) {
      console.log("Audio exception:", err);
    }
  };

  // Build shuffled decision queue
  const buildDecisionQueue = () => {
    const queue: { label: string; type: "good" | "bad" }[] = [];
    goodItems.forEach(item => queue.push({ label: item, type: "good" }));
    badItems.forEach(item => queue.push({ label: item, type: "bad" }));

    // Fisher-Yates shuffle
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }

    decisionQueueRef.current = queue;
    decisionIndexRef.current = 0;
  };

  const canSpawnAt = (y: number) => {
    return obstaclesRef.current.every(o => Math.abs(o.y - y) > MIN_VERTICAL_GAP);
  };

  const spawnObstacle = () => {
    if (gameOverRef.current || obstaclesRef.current.length >= MAX_OBSTACLES) return;

    if (decisionIndexRef.current >= decisionQueueRef.current.length) {
      roundRef.current++;
      buildDecisionQueue();
    }

    let y = 0;
    let attempts = 0;
    do {
      y = Math.random() * (420 - OBSTACLE_HEIGHT - 20) + 10;
      attempts++;
    } while (!canSpawnAt(y) && attempts < 10);

    const decision = decisionQueueRef.current[decisionIndexRef.current++];
    const last = obstaclesRef.current[obstaclesRef.current.length - 1];
    const randomGap = MIN_HORIZONTAL_GAP + Math.random() * 120;
    const obstacleSpeed = decision.type === "good" ? goodSpeedRef.current : badSpeedRef.current;

    obstaclesRef.current.push({
      x: last ? Math.max(900, last.x + randomGap) : 900,
      y,
      w: OBSTACLE_WIDTH,
      h: OBSTACLE_HEIGHT,
      type: decision.type,
      label: decision.label,
      speed: obstacleSpeed
    });

    if (decision.type === "good" && goodSpeedRef.current < MAX_SPEED) {
      goodSpeedRef.current = Math.min(MAX_SPEED, goodSpeedRef.current + SPEED_INCREMENT_PER_SPAWN);
    }
  };

  const runSpawnLoop = () => {
    spawnObstacle();
    spawnTimeoutId.current = setTimeout(runSpawnLoop, 700);
  };

  const updateScore = (change: number) => {
    scoreRef.current += change;
    scoreRef.current = Math.max(0, Math.min(WIN_SCORE, scoreRef.current));
    
    setScore(scoreRef.current);
    setScoreChangedType(change > 0 ? "up" : "down");
    setTimeout(() => setScoreChangedType(null), 200);

    if (scoreRef.current >= WIN_SCORE) {
      endGame(true);
    } else if (scoreRef.current <= GAME_OVER_SCORE) {
      endGame(false);
    }
  };

  const collide = (a: { x: number; y: number; w: number; h: number }, b: Obstacle) => {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (gameOverRef.current) return;

    // Update Player Y Position
    if (moveUpRef.current) playerRef.current.y -= PLAYER_SPEED;
    if (moveDownRef.current) playerRef.current.y += PLAYER_SPEED;
    playerRef.current.y = Math.max(0, Math.min(420 - playerRef.current.h, playerRef.current.y));

    // Clear Canvas
    ctx.clearRect(0, 0, 900, 420);

    // Draw scrolling background
    bgXRef.current -= BG_SPEED;
    if (bgXRef.current <= -900) bgXRef.current = 0;
    if (bgImgRef.current) {
      ctx.drawImage(bgImgRef.current, bgXRef.current, 0, 900, 420);
      ctx.drawImage(bgImgRef.current, bgXRef.current + 900, 0, 900, 420);
    }

    // Draw player
    if (playerImgRef.current) {
      ctx.drawImage(playerImgRef.current, playerRef.current.x, playerRef.current.y, playerRef.current.w, playerRef.current.h);
    }

    // Draw and update obstacles
    const obstacles = obstaclesRef.current;
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const o = obstacles[i];
      o.x -= o.speed;

      // Drop shadow (hard black offset block)
      ctx.fillStyle = "#000000";
      ctx.fillRect(o.x + 6, o.y + 6, o.w, o.h);

      // Box body
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(o.x, o.y, o.w, o.h);

      // Border outline
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(o.x, o.y, o.w, o.h);

      // Label text
      ctx.fillStyle = "#000000";
      ctx.font = `900 17px ${spaceGrotesk.style.fontFamily}, 'Space Grotesk', system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(o.label, o.x + o.w / 2, o.y + o.h / 2);

      // Collision detection
      if (collide(playerRef.current, o)) {
        if (o.type === "good") {
          playRandomGoodSound();
          updateScore(GOOD_HIT_POINTS);
        } else {
          playRandomBadSound();
          updateScore(BAD_HIT_POINTS);
        }
        obstacles.splice(i, 1);
        continue;
      }

      // Exit screen (skipped obstacle check)
      if (o.x < -o.w) {
        if (o.type === "good") {
          updateScore(GOOD_SKIP_PENALTY);
        }
        obstacles.splice(i, 1);
      }
    }

    animationFrameId.current = requestAnimationFrame(() => draw(ctx));
  };

  const endGame = (isWin: boolean) => {
    gameOverRef.current = true;
    cleanupGame();
    stopAllAudio();

    if (isWin) {
      setGameState("win");
      if (winSoundRef.current) {
        winSoundRef.current.currentTime = 0;
        winSoundRef.current.play().catch(e => console.log("Audio error:", e));
      }
    } else {
      setGameState("lose");
      if (gameOverSoundRef.current) {
        gameOverSoundRef.current.currentTime = 0;
        gameOverSoundRef.current.play().catch(e => console.log("Audio error:", e));
      }
    }
  };

  const startGame = () => {
    cleanupGame();
    stopAllAudio();

    gameOverRef.current = false;
    setGameState("playing");
    scoreRef.current = 20;
    setScore(20);
    
    goodSpeedRef.current = 4;
    badSpeedRef.current = 4;
    bgXRef.current = 0;
    decisionIndexRef.current = 0;
    roundRef.current = 1;
    moveUpRef.current = false;
    moveDownRef.current = false;
    obstaclesRef.current = [];

    buildDecisionQueue();
    runSpawnLoop();

    // Start drawing
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          animationFrameId.current = requestAnimationFrame(() => draw(ctx));
        }
      }
    }, 50);
  };

  // Touch handlers
  const handlePressUp = () => {
    moveUpRef.current = true;
  };
  const handleReleaseUp = () => {
    moveUpRef.current = false;
  };
  const handlePressDown = () => {
    moveDownRef.current = true;
  };
  const handleReleaseDown = () => {
    moveDownRef.current = false;
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 bg-[#FFF8E7] ${spaceGrotesk.className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* HEADER BAR */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-4 relative">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a] uppercase"
                style={{ textShadow: "3px 3px 0 #FFE066, 6px 6px 0 #0a0a0a" }}>
              FINANCE DODGE RUNNER
            </h1>
            <span className={`hidden sm:inline-block font-bold text-xs bg-[#B7F3C0] border-3 border-[#0a0a0a] rounded-full px-3 py-1 shadow-[3px_3px_0_#0a0a0a] -rotate-6 ${jetbrainsMono.className}`}>
              v1.0
            </span>
          </div>
          <p className={`text-sm sm:text-base font-semibold text-[#0a0a0a] opacity-80 mt-3 ${jetbrainsMono.className}`}>
            Learn money decisions the hard way 💸
          </p>
        </header>

        {/* INSTRUCTIONS SCREEN */}
        {gameState === "instructions" && (
          <div className="max-w-2xl mx-auto bg-[#B7F3C0] border-[5px] border-[#0a0a0a] rounded-none p-6 sm:p-10 shadow-[10px_10px_0_#0a0a0a] text-center">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#0a0a0a] mb-6">🎮 How to Play</h2>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between text-left">
              <div className="flex-1 w-full">
                <ul className={`space-y-3 text-xs sm:text-sm font-semibold ${jetbrainsMono.className}`}>
                  <li className="bg-white border-3 border-[#0a0a0a] p-3 shadow-[3px_3px_0_#0a0a0a]">
                    ⬆️ ⬇️ Use <b>Arrow Keys</b> or the <b>on-screen buttons</b> to move
                  </li>
                  <li className="bg-white border-3 border-[#0a0a0a] p-3 shadow-[3px_3px_0_#0a0a0a]">
                    ⭐ Start with <b>20 points</b>
                  </li>
                  <li className="bg-white border-3 border-[#0a0a0a] p-3 shadow-[3px_3px_0_#0a0a0a] text-emerald-800">
                    ✅ Hitting a good decision → <b>+10 points</b>
                  </li>
                  <li className="bg-white border-3 border-[#0a0a0a] p-3 shadow-[3px_3px_0_#0a0a0a] text-rose-800">
                    ❌ Hitting a bad decision → <b>−20 points</b>
                  </li>
                  <li className="bg-[#FFE066] border-3 border-[#0a0a0a] p-3 shadow-[3px_3px_0_#0a0a0a]">
                    ⚠️ Skipping a good decision → <b>−10 points</b>
                  </li>
                  <li className="bg-[#FFADAD] border-3 border-[#0a0a0a] p-3 shadow-[3px_3px_0_#0a0a0a]">
                    💥 Game ends at <b>0 points</b>
                  </li>
                  <li className="bg-[#B7F3C0] border-3 border-[#0a0a0a] p-3 shadow-[3px_3px_0_#0a0a0a] font-bold">
                    🏆 Reach <b>100 points</b> to win!
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center shrink-0">
                <div className={`font-bold text-[10px] sm:text-xs text-[#0a0a0a] bg-[#FFE066] border-3 border-[#0a0a0a] px-3 py-1.5 shadow-[3px_3px_0_#0a0a0a] -rotate-3 mb-3 z-10 ${jetbrainsMono.className}`}>
                  BONUS TIP BY ME
                </div>
                <div className="relative w-48 h-48 border-4 border-[#0a0a0a] shadow-[6px_6px_0_#0a0a0a] rotate-2 overflow-hidden bg-white">
                  <Image
                    src="/game-zone/nirmala.jpeg"
                    alt="Tax meme advice"
                    fill
                    sizes="192px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="mt-8 px-10 py-4 bg-[#8EC9FF] text-[#0a0a0a] border-[5px] border-[#0a0a0a] font-black text-xl sm:text-2xl uppercase tracking-wider hover:-translate-y-1 hover:shadow-[13px_13px_0_#0a0a0a] active:translate-y-1 active:shadow-[3px_3px_0_#0a0a0a] shadow-[10px_10px_0_#0a0a0a] transition-all cursor-pointer"
            >
              Start Game
            </button>
          </div>
        )}

        {/* ACTIVE GAME INTERFACE */}
        {gameState === "playing" && (
          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto items-stretch">
            
            {/* MOBILE COMPACT SCORE BAR */}
            <div className="lg:hidden w-full flex items-center gap-3 bg-[#FFE066] border-4 border-[#0a0a0a] px-4 py-3 shadow-[4px_4px_0_#0a0a0a] select-none">
              <div className="flex flex-col items-center">
                <span className={`text-[10px] font-bold opacity-75 uppercase ${jetbrainsMono.className}`}>SCORE</span>
                <span className={`text-2xl font-black transition-all ${
                  scoreChangedType === "up" ? "scale-110 text-emerald-800" :
                  scoreChangedType === "down" ? "scale-110 text-rose-800" : "text-[#0a0a0a]"
                }`}>
                  {score}
                </span>
              </div>
              
              <div className="flex-1 h-3.5 bg-white border-[3px] border-[#0a0a0a] overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${score}%`,
                    backgroundImage: "repeating-linear-gradient(45deg, #B7F3C0, #B7F3C0 10px, #88e29c 10px, #88e29c 20px)"
                  }}
                />
              </div>

              <div className="flex flex-col items-center shrink-0">
                <span className={`text-[10px] font-bold opacity-75 uppercase ${jetbrainsMono.className}`}>LOSE AT</span>
                <span className="text-sm font-black text-rose-600">0</span>
              </div>
            </div>

            {/* CANVAS WRAPPER (Left Panel) */}
            <div className="flex-1 bg-[#8EC9FF] border-[5px] border-[#0a0a0a] p-4 shadow-[10px_10px_0_#0a0a0a] flex flex-col justify-between">
              <div className="relative w-full overflow-hidden border-4 border-[#0a0a0a] bg-white leading-[0]">
                <canvas
                  ref={canvasRef}
                  width="900"
                  height="420"
                  className="w-full h-auto block select-none pointer-events-none"
                />
              </div>

              {/* IMMERSIVE TOUCH CONTROLS (Below Canvas, hidden on desktop) */}
              <div className="lg:hidden mt-4 bg-[#B7F3C0] border-4 border-[#0a0a0a] p-4 flex flex-col items-center gap-3">
                <h3 className={`text-xs font-black uppercase tracking-widest text-[#0a0a0a] opacity-80 ${jetbrainsMono.className}`}>
                  Navigation Controls
                </h3>
                
                <div className="flex gap-8 justify-center w-full">
                  <button
                    onMouseDown={(e) => { e.preventDefault(); handlePressUp(); }}
                    onMouseUp={(e) => { e.preventDefault(); handleReleaseUp(); }}
                    onMouseLeave={(e) => { e.preventDefault(); handleReleaseUp(); }}
                    onTouchStart={(e) => { e.preventDefault(); handlePressUp(); }}
                    onTouchEnd={(e) => { e.preventDefault(); handleReleaseUp(); }}
                    onTouchCancel={(e) => { e.preventDefault(); handleReleaseUp(); }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-[#8EC9FF] border-4 border-[#0a0a0a] text-3xl font-black flex items-center justify-center shadow-[4px_4px_0_#0a0a0a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0a] select-none touch-none cursor-pointer"
                    aria-label="Move Up"
                  >
                    ▲
                  </button>

                  <button
                    onMouseDown={(e) => { e.preventDefault(); handlePressDown(); }}
                    onMouseUp={(e) => { e.preventDefault(); handleReleaseDown(); }}
                    onMouseLeave={(e) => { e.preventDefault(); handleReleaseDown(); }}
                    onTouchStart={(e) => { e.preventDefault(); handlePressDown(); }}
                    onTouchEnd={(e) => { e.preventDefault(); handleReleaseDown(); }}
                    onTouchCancel={(e) => { e.preventDefault(); handleReleaseDown(); }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFADAD] border-4 border-[#0a0a0a] text-3xl font-black flex items-center justify-center shadow-[4px_4px_0_#0a0a0a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#0a0a0a] select-none touch-none cursor-pointer"
                    aria-label="Move Down"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>

            {/* DESKTOP SIDE PANEL (Right Panel) */}
            <aside className="hidden lg:flex w-72 bg-[#FFE066] border-[5px] border-[#0a0a0a] p-6 shadow-[10px_10px_0_#0a0a0a] flex-col items-center justify-between text-center select-none shrink-0">
              <div className="w-full flex flex-col items-center">
                <h2 className="text-2xl font-black text-[#0a0a0a] tracking-wider uppercase mb-4">SCORE</h2>
                
                <div className={`text-5xl font-black bg-white border-4 border-[#0a0a0a] px-6 py-4 shadow-[6px_6px_0_#0a0a0a] my-4 select-all transition-all ${
                  scoreChangedType === "up" ? "scale-110 bg-[#B7F3C0] rotate-[-2deg]" :
                  scoreChangedType === "down" ? "scale-110 bg-red-500 text-white rotate-[2deg]" : ""
                } ${jetbrainsMono.className}`}>
                  {score}
                </div>

                <div className="w-full h-5 bg-white border-3 border-[#0a0a0a] overflow-hidden my-4">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${score}%`,
                      backgroundImage: "repeating-linear-gradient(45deg, #B7F3C0, #B7F3C0 10px, #88e29c 10px, #88e29c 20px)"
                    }}
                  />
                </div>
              </div>

              <div className={`w-full text-left space-y-3 font-semibold text-xs ${jetbrainsMono.className}`}>
                <div className="bg-white border-3 border-[#0a0a0a] p-3.5 shadow-[3px_3px_0_#0a0a0a] text-center">
                  🏆 Win at <b>100</b>
                </div>
                <div className="bg-white border-3 border-[#0a0a0a] p-3.5 shadow-[3px_3px_0_#0a0a0a] text-center">
                  💥 Lose at <b>0</b>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* GAME OVER SCREEN */}
        {(gameState === "win" || gameState === "lose") && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-4 select-none">
            <div className={`w-full max-w-sm border-[5px] border-[#0a0a0a] p-8 text-center shadow-[10px_10px_0_#0a0a0a] rotate-[-1deg] ${
              gameState === "win" ? "bg-[#B7F3C0]" : "bg-[#FFADAD]"
            }`}>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] uppercase tracking-wide"
                  style={{ textShadow: gameState === "win" ? "3px 3px 0 #B7F3C0, 6px 6px 0 #0a0a0a" : "3px 3px 0 #FFE066, 6px 6px 0 #0a0a0a" }}>
                {gameState === "win" ? "🏆 YOU WIN! 🏆" : "GAME OVER"}
              </h2>

              <div className={`text-6xl font-black bg-white border-4 border-[#0a0a0a] px-8 py-3 shadow-[6px_6px_0_#0a0a0a] inline-block my-6 ${jetbrainsMono.className}`}>
                {score}
              </div>

              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={startGame}
                  className="w-full py-3.5 bg-[#FFE066] text-[#0a0a0a] border-4 border-[#0a0a0a] font-black text-lg uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#0a0a0a] active:translate-y-0.5 active:shadow-[2px_2px_0_#0a0a0a] shadow-[6px_6px_0_#0a0a0a] transition-all cursor-pointer"
                >
                  Retry
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full py-3.5 bg-white text-[#0a0a0a] border-4 border-[#0a0a0a] font-black text-lg uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#0a0a0a] active:translate-y-0.5 active:shadow-[2px_2px_0_#0a0a0a] shadow-[6px_6px_0_#0a0a0a] transition-all cursor-pointer"
                >
                  EXIT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HINT FOOTER BAR */}
        <footer className={`max-w-6xl mx-auto mt-6 bg-[#0a0a0a] text-[#FFF8E7] flex flex-col sm:flex-row justify-between items-center px-6 py-3.5 border-4 border-[#0a0a0a] gap-2 text-xs font-bold tracking-wide select-none ${jetbrainsMono.className}`}>
          <span className="hidden sm:inline-block">⬆️ ⬇️ Use Keyboard Arrows to Move</span>
          <span>🟧 Decisions are neutral — think first before hitting!</span>
        </footer>

      </div>
    </div>
  );
}
