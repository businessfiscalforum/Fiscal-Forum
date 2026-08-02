"use client";

import React, { useRef, useEffect } from "react";

interface LiquidProps {
  isHovered: boolean;
  colors?: Record<string, string>;
}

export const Liquid: React.FC<LiquidProps> = ({ isHovered, colors }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Default green-mint theme colors to match the brand
  const themeColors = {
    color1: "#FFFFFF",
    color2: "#E2F5E9",
    color3: "#D1FAE5",
    color4: "#A7F3D0",
    color5: "#6EE7B7",
    color6: "#34D399",
    color7: "#10B981",
    color8: "#059669",
    color9: "#047857",
    color10: "#065F46",
    color11: "#064E3B",
    color12: "#14B8A6",
    color13: "#0D9488",
    color14: "#0F766E",
    color15: "#115E59",
    color16: "#134E4A",
    color17: "#1FA463",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 150);
    let height = (canvas.height = canvas.offsetHeight || 40);

    const handleResize = () => {
      if (!canvas) return;
      width = (canvas.width = canvas.offsetWidth || 150);
      height = (canvas.height = canvas.offsetHeight || 40);
    };
    window.addEventListener("resize", handleResize);

    const colorValues = Object.values(themeColors);

    // Create blobs
    const blobCount = 5;
    const blobs = Array.from({ length: blobCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * (width * 0.4) + width * 0.2,
      color: colorValues[Math.floor(Math.random() * colorValues.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Speed multiplier when hovered
      const speedMultiplier = isHovered ? 2.5 : 1.0;

      blobs.forEach((blob) => {
        // Move blobs
        blob.x += blob.vx * speedMultiplier;
        blob.y += blob.vy * speedMultiplier;

        // Bounce boundaries
        if (blob.x - blob.radius < 0 && blob.vx < 0) blob.vx = -blob.vx;
        if (blob.x + blob.radius > width && blob.vx > 0) blob.vx = -blob.vx;
        if (blob.y - blob.radius < 0 && blob.vy < 0) blob.vy = -blob.vy;
        if (blob.y + blob.radius > height && blob.vy > 0) blob.vy = -blob.vy;

        // Draw radial gradient
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ filter: "blur(6px) saturate(1.2)" }}
    />
  );
};
