"use client";

import React, { useEffect, useRef } from "react";

interface Note {
  x: number;
  y: number;
  initialX: number;
  speedY: number;
  angle: number;
  scale: number;
  swayTime: number;
  swaySpeed: number;
  swayAmplitude: number;
  rotationSpeed: number;
  typeIndex: number;
}

const noteStyles = [
  { x: 0, y: 0, w: 768, h: 256 },       // ₹10
  { x: 768, y: 0, w: 768, h: 256 },     // ₹20
  { x: 0, y: 256, w: 768, h: 256 },     // ₹50
  { x: 768, y: 256, w: 768, h: 256 },   // ₹100
  { x: 0, y: 512, w: 768, h: 256 },     // ₹200
  { x: 768, y: 512, w: 768, h: 256 },   // ₹500
  { x: 384, y: 768, w: 768, h: 256 }    // ₹2000
];

export default function FallingNotes() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageLoadedRef = useRef(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const notesRef = useRef<Note[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const spawnTimerRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load sprite sheet image
    const img = new window.Image();
    img.src = "/game-zone/notes-sheet.png";
    img.onload = () => {
      imageLoadedRef.current = true;
      imageRef.current = img;
    };

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Spawn and update logic loop
    const updateAndDraw = () => {
      if (!imageLoadedRef.current || !imageRef.current) {
        animationFrameId.current = requestAnimationFrame(updateAndDraw);
        return;
      }

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // 1. Spawning Logic
      spawnTimerRef.current += 1;
      // Spawn a note every 45 frames (approx 750ms) if notes are under limit (max 30)
      if (spawnTimerRef.current >= 45 && notesRef.current.length < 30) {
        spawnTimerRef.current = 0;
        
        // Decide left or right column
        const isLeft = Math.random() < 0.5;
        const leftBoundary = W >= 1024 ? W * 0.20 : W * 0.12;
        const rightBoundary = W >= 1024 ? W * 0.80 : W * 0.88;

        let spawnX = 0;
        if (isLeft) {
          spawnX = Math.random() * leftBoundary;
        } else {
          spawnX = rightBoundary + Math.random() * (W - rightBoundary);
        }

        // Randomize note properties
        const scale = 0.06 + Math.random() * 0.04; // compact size for immersive falling
        const note: Note = {
          x: spawnX,
          y: -50,
          initialX: spawnX,
          speedY: 1.0 + Math.random() * 1.5,
          angle: Math.random() * Math.PI * 2,
          scale,
          swayTime: Math.random() * 100,
          swaySpeed: 0.01 + Math.random() * 0.02,
          swayAmplitude: 20 + Math.random() * 30,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          typeIndex: Math.floor(Math.random() * noteStyles.length)
        };
        notesRef.current.push(note);
      }

      // 2. Update and Draw active notes
      const notes = notesRef.current;
      for (let i = notes.length - 1; i >= 0; i--) {
        const n = notes[i];
        
        // Update physics
        n.y += n.speedY;
        n.swayTime += n.swaySpeed;
        n.x = n.initialX + Math.sin(n.swayTime) * n.swayAmplitude;
        n.angle += n.rotationSpeed + Math.sin(n.swayTime) * 0.01;

        // Draw note
        const style = noteStyles[n.typeIndex];
        const dw = style.w * n.scale;
        const dh = style.h * n.scale;

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.angle);
        
        // Subtle drop shadow for depth
        ctx.shadowColor = "rgba(10, 10, 10, 0.15)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 4;

        ctx.drawImage(
          imageRef.current,
          style.x,
          style.y,
          style.w,
          style.h,
          -dw / 2,
          -dh / 2,
          dw,
          dh
        );
        ctx.restore();

        // Remove notes that fall below viewport
        if (n.y > H + 50) {
          notes.splice(i, 1);
        }
      }

      animationFrameId.current = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId.current = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none select-none z-[40]"
      style={{ mixBlendMode: "multiply" }} // transparent edges
    />
  );
}
