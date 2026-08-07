const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImg = new Image();
playerImg.src = "vijay.jpeg";

const bgImg = new Image();
bgImg.src = "galaxy.jpg";

/* ---------- SCORING CONSTANTS ---------- */
const GOOD_HIT_POINTS = 10;
const BAD_HIT_POINTS = -20;
const GOOD_SKIP_PENALTY = -10;
const GAME_OVER_SCORE = 0;
const WIN_SCORE = 100;

/* ---------- SOUND EFFECTS ---------- */

// Game over sound
const gameOverSound = new Audio("y2mate_HOnnyD0.mp3");
gameOverSound.volume = 0.7;
gameOverSound.loop = false;

// GOOD decision sounds WITH INDIVIDUAL DURATIONS (RANDOM)
const goodSounds = [
  { audio: new Audio("airhorn.mp3"), duration: 600 },
  { audio: new Audio("punjabi.mp3"), duration: 1200 }
];

// BAD decision sounds WITH INDIVIDUAL DURATIONS (RANDOM)
const badSounds = [
  { audio: new Audio("Fahhhh.mp3"), duration: 800 },
  { audio: new Audio("getfromytcom-the-angriest-scamme-1.mp3"), duration: 2000 },
  { audio: new Audio("Voicy_Hey_Ma_Mataji.mp3"), duration: 3000 }
];

// Configure all sounds
[...goodSounds, ...badSounds].forEach(s => {
  s.audio.volume = 0.5;
  s.audio.playbackRate = 1.0;
});

/* ---------- SOUND HELPERS ---------- */
function playRandomGoodSound() {
  const item = goodSounds[Math.floor(Math.random() * goodSounds.length)];
  item.audio.currentTime = 0;
  item.audio.play();
  setTimeout(() => item.audio.pause(), item.duration);
}

function playRandomBadSound() {
  const item = badSounds[Math.floor(Math.random() * badSounds.length)];
  item.audio.currentTime = 0;
  item.audio.play();
  setTimeout(() => item.audio.pause(), item.duration);
}

/* ---------- UI ELEMENTS ---------- */
const scoreValue = document.getElementById("scoreValue");
const progressBar = document.getElementById("progressBar");
const scoreValueMobile = document.getElementById("scoreValueMobile");
const progressBarMobile = document.getElementById("progressBarMobile");

/* ---------- BACKGROUND ---------- */
let bgX = 0;
const BG_SPEED = 1.7;

/* ---------- PLAYER ---------- */
const player = { x: 80, y: 160, w: 70, h: 110 };

/* ---------- GAME STATE ---------- */
let obstacles = [];
let score = 20;
let goodSpeed = 4;
let badSpeed = 4;
let gameOver = false;

/* ---------- OBSTRUCTION CONTROL ---------- */
const MAX_OBSTACLES = 4;
const OBSTACLE_WIDTH = 220;
const OBSTACLE_HEIGHT = 55;
const MIN_VERTICAL_GAP = 90;
const MIN_HORIZONTAL_GAP = 280;
const SPEED_INCREMENT_PER_SPAWN = 0.1;
const MAX_SPEED = 11.0;

/* ---------- DATA ---------- */
const goodItems = [
  "Start Early","Budgeting Monthly","Emergency Fund","Diversified Investing",
  "Debt Payoff","Tax Planning","Career Growth","Limiting Debt",
  "Term Insurance","Living Modestly","Continuous Learning",
  "Index Funds","Retirement Accounts","Health Insurance","Business Equity",
  "Delay gratification","Limit lifestyle","REITs","Corporate Bonds","Think long-term",
  "Sovereign Gold","Target Funds","Diversify risk","Research assets","Network effectively",
  "Optimize taxes","Private equity","Venture capital","Value stocks",
];

const badItems = [
  "Delaying Savings","Overspending","High-Interest Debt","Panic Selling",
  "Lifestyle Inflation","Emotional Spending","Maxing Cards",
  "Skipping Insurance","Status Chasing","Impulsive Buying",
  "Luxury Cars","Fast Fashion","Lottery Tickets","Speculative Coins",
  "No Plan","Penny stocks","Chit funds","Ponzi schemes",
  "Skipping audits","Single-stock focus","No insurance","Chasing hype","Blindly trusting",
  "Penny stocks","Naked options","High-Risk Speculation","Poor Value Tools","Unregulated bonds",
  "P2P lending","ULIP plans"
];

/* ---------- DECISION QUEUE SYSTEM ---------- */
let decisionQueue = [];
let decisionIndex = 0;
let round = 1;

function buildDecisionQueue() {
  decisionQueue = [];

  goodItems.forEach(item => decisionQueue.push({ label: item, type: "good" }));
  badItems.forEach(item => decisionQueue.push({ label: item, type: "bad" }));

  for (let i = decisionQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [decisionQueue[i], decisionQueue[j]] =
      [decisionQueue[j], decisionQueue[i]];
  }

  decisionIndex = 0;
}

/* ---------- CONTROLS (KEYBOARD + TOUCH, CONTINUOUS HOLD) ---------- */
const PLAYER_SPEED = 6.5; // px per frame while a direction is held
let moveUp = false;
let moveDown = false;

document.addEventListener("keydown", e => {
  if (gameOver) return;
  if (e.key === "ArrowUp") { moveUp = true; e.preventDefault(); }
  if (e.key === "ArrowDown") { moveDown = true; e.preventDefault(); }
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowUp") moveUp = false;
  if (e.key === "ArrowDown") moveDown = false;
});

function bindHoldButton(el, onStart, onEnd) {
  if (!el) return;
  const start = e => { e.preventDefault(); onStart(); el.classList.add("is-pressed"); };
  const end = e => { if (e) e.preventDefault(); onEnd(); el.classList.remove("is-pressed"); };

  el.addEventListener("touchstart", start, { passive: false });
  el.addEventListener("touchend", end, { passive: false });
  el.addEventListener("touchcancel", end, { passive: false });

  // Pointer events cover mouse/stylus too (e.g. testing on desktop touch screens)
  el.addEventListener("pointerdown", start);
  el.addEventListener("pointerup", end);
  el.addEventListener("pointerleave", end);
  el.addEventListener("pointercancel", end);

  // Prevent ghost click / context menu issues
  el.addEventListener("contextmenu", e => e.preventDefault());
}

const btnUp = document.getElementById("btnUp");
const btnDown = document.getElementById("btnDown");

bindHoldButton(btnUp, () => { moveUp = true; }, () => { moveUp = false; });
bindHoldButton(btnDown, () => { moveDown = true; }, () => { moveDown = false; });

function updatePlayerPosition() {
  if (moveUp) player.y -= PLAYER_SPEED;
  if (moveDown) player.y += PLAYER_SPEED;
  player.y = Math.max(0, Math.min(canvas.height - player.h, player.y));
}

/* ---------- SPAWN HELPERS ---------- */
function canSpawnAt(y) {
  return obstacles.every(o => Math.abs(o.y - y) > MIN_VERTICAL_GAP);
}

/* ---------- SPAWN OBSTACLE ---------- */
function spawnObstacle() {
  if (gameOver || obstacles.length >= MAX_OBSTACLES) return;

  if (decisionIndex >= decisionQueue.length) {
    round++;
    buildDecisionQueue();
  }

  let y, attempts = 0;
  do {
    y = Math.random() * (canvas.height - OBSTACLE_HEIGHT - 20) + 10;
    attempts++;
  } while (!canSpawnAt(y) && attempts < 10);

  const decision = decisionQueue[decisionIndex++];
  const last = obstacles[obstacles.length - 1];
  const randomGap = MIN_HORIZONTAL_GAP + Math.random() * 120;

  const obstacleSpeed = decision.type === "good" ? goodSpeed : badSpeed;

  obstacles.push({
    x: last ? Math.max(canvas.width, last.x + randomGap) : canvas.width,
    y,
    w: OBSTACLE_WIDTH,
    h: OBSTACLE_HEIGHT,
    type: decision.type,
    label: decision.label,
    speed: obstacleSpeed
  });

  // Gradual speed increment for right decision (good) obstacles
  if (decision.type === "good" && goodSpeed < MAX_SPEED) {
    goodSpeed = Math.min(MAX_SPEED, goodSpeed + SPEED_INCREMENT_PER_SPAWN);
  }
}

/* ---------- SPAWN LOOP ---------- */
function spawnLoop() {
  spawnObstacle();
  setTimeout(spawnLoop, 700);
}

/* ---------- SCORE UPDATE ---------- */
function updateScore(change) {
  score += change;
  // Ensure score stays within bounds [0, WIN_SCORE]
  score = Math.max(0, Math.min(WIN_SCORE, score));
  
  scoreValue.innerText = score;
  if (scoreValueMobile) scoreValueMobile.innerText = score;

  const upDownClass = change > 0 ? "score-up" : "score-down";
  scoreValue.classList.add(upDownClass);
  if (scoreValueMobile) scoreValueMobile.classList.add(upDownClass);
  setTimeout(() => {
    scoreValue.classList.remove("score-up", "score-down");
    if (scoreValueMobile) scoreValueMobile.classList.remove("score-up", "score-down");
  }, 200);

  const progress = Math.max(0, Math.min(100, score));
  progressBar.style.width = progress + "%";
  if (progressBarMobile) progressBarMobile.style.width = progress + "%";

  if (score >= WIN_SCORE) {
    endGame(true);
  } else if (score <= GAME_OVER_SCORE) {
    endGame(false);
  }
}

/* ---------- COLLISION ---------- */
function collide(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

/* ---------- DRAW ---------- */
function drawBackground() {
  bgX -= BG_SPEED;
  if (bgX <= -canvas.width) bgX = 0;
  ctx.drawImage(bgImg, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, bgX + canvas.width, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
}

/* ---------- GAME LOOP ---------- */
function draw() {
  if (gameOver) return;

  updatePlayerPosition();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawPlayer();

  obstacles.forEach((o, i) => {
    o.x -= o.speed;

    ctx.shadowBlur = 0;
    // hard offset shadow block
    ctx.fillStyle = "#000000";
    ctx.fillRect(o.x + 6, o.y + 6, o.w, o.h);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(o.x, o.y, o.w, o.h);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(o.x, o.y, o.w, o.h);

    ctx.fillStyle = "#000";
    ctx.font = "900 17px 'Space Grotesk', Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText(o.label, o.x + o.w / 2, o.y + o.h / 2 + 5);

    if (collide(player, o)) {
      if (o.type === "good") {
        playRandomGoodSound();
        updateScore(GOOD_HIT_POINTS);
      } else {
        playRandomBadSound();
        updateScore(BAD_HIT_POINTS);
      }
      obstacles.splice(i, 1);
    }

    // SKIPPED OBSTACLE
    if (o.x < -o.w) {
      if (o.type === "good") {
        updateScore(GOOD_SKIP_PENALTY);
      }
      obstacles.splice(i, 1);
    }
  });

  requestAnimationFrame(draw);
}

/* ---------- GAME OVER ---------- */
function endGame(isWin = false) {
  if (gameOver) return;
  gameOver = true;

  const titleEl = document.getElementById("gameOverTitle");
  const boxEl = document.getElementById("gameOverBox");

  if (isWin) {
    if (titleEl) {
      titleEl.innerText = "🏆 YOU WIN! 🏆";
      titleEl.style.textShadow = "3px 3px 0 #B7F3C0, 6px 6px 0 #0a0a0a";
    }
    if (boxEl) {
      boxEl.style.background = "var(--mint)";
    }
    const winSound = new Audio("wow.mp3");
    winSound.volume = 0.7;
    winSound.play();
  } else {
    if (titleEl) {
      titleEl.innerText = "GAME OVER";
      titleEl.style.textShadow = "3px 3px 0 var(--yellow), 6px 6px 0 var(--ink)";
    }
    if (boxEl) {
      boxEl.style.background = "var(--pink)";
    }
    gameOverSound.currentTime = 0;
    gameOverSound.play();
  }

  document.getElementById("finalScore").innerText = score;
  document.getElementById("gameOverScreen").style.display = "flex";
}

/* ---------- START ---------- */
let loaded = 0;
[playerImg, bgImg].forEach(img => {
  img.onload = () => {
    loaded++;
    // Game will start ONLY when user clicks "Start Game"
  };
});


/* ---------- RESTART ---------- */
function restartGame() {
  obstacles = [];
  score = 20;
  goodSpeed = 4;
  badSpeed = 4;
  gameOver = false;
  bgX = 0;
  decisionIndex = 0;
  round = 1;
  moveUp = false;
  moveDown = false;

  gameOverSound.pause();
  gameOverSound.currentTime = 0;

  buildDecisionQueue();

  scoreValue.innerText = "20";
  progressBar.style.width = "20%";
  if (scoreValueMobile) scoreValueMobile.innerText = "20";
  if (progressBarMobile) progressBarMobile.style.width = "20%";
  document.getElementById("gameOverScreen").style.display = "none";

  draw();
}

/* ---------- START FROM INSTRUCTIONS ---------- */
function startGame() {
  document.getElementById("instructionsScreen").style.display = "none";
  document.getElementById("gameArea").classList.remove("hidden");

  buildDecisionQueue();
  spawnLoop();
  draw();
}
