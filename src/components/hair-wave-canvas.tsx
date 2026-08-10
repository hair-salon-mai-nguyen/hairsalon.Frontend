"use client";

import React, { useEffect, useRef } from "react";

export const HairWaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track mouse position
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Configuration for silky hair-like waves
    const waveCount = 8;
    const waves: {
      y: number;
      length: number;
      amplitude: number;
      speed: number;
      phase: number;
      color: string;
      lineWidth: number;
    }[] = [];

    // Luxury gold palette for waves
    const goldGradients = [
      "rgba(212, 178, 103, 0.15)", // gold-400
      "rgba(197, 155, 63, 0.2)",  // gold-500
      "rgba(167, 124, 46, 0.12)", // gold-600
      "rgba(243, 229, 171, 0.18)", // champagne
      "rgba(253, 251, 247, 0.08)", // gold-50
      "rgba(134, 95, 34, 0.15)",  // gold-700
    ];

    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: height / 2,
        length: 0.002 + Math.random() * 0.003,
        amplitude: 40 + Math.random() * 60,
        speed: 0.01 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        color: goldGradients[i % goldGradients.length],
        lineWidth: 1 + Math.random() * 2,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw background glow
      const radialGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        width * 0.4
      );
      radialGlow.addColorStop(0, "rgba(197, 155, 63, 0.08)");
      radialGlow.addColorStop(1, "rgba(8, 8, 8, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw waves
      for (let w = 0; w < waves.length; w++) {
        const wave = waves[w];
        wave.phase += wave.speed;

        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;

        // Interaction effect: mouse pulls the wave centerline
        const mouseEffectY = (mouse.y - height / 2) * (1 - Math.abs(mouse.x - width / 2) / (width / 2)) * 0.5;

        for (let x = 0; x < width; x++) {
          // Calculate standard sine-based silk hair strand wave
          const dx = x - mouse.x;
          const dist = Math.sqrt(dx * dx);
          
          // Magnify wave amplitude close to mouse
          const proximity = Math.max(0, 1 - dist / 300);
          const amp = wave.amplitude + proximity * 40;
          
          const angle = x * wave.length + wave.phase;
          const y = wave.y + Math.sin(angle) * amp + mouseEffectY * (1 - dist / (width / 2));

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw premium particle dots floating along waves
      ctx.fillStyle = "rgba(212, 178, 103, 0.4)";
      for (let p = 0; p < 15; p++) {
        const time = Date.now() * 0.0005;
        const px = (width * 0.15 + (width * 0.7 * (p / 15)) + Math.sin(time + p) * 50) % width;
        const py = (height * 0.5 + Math.cos(time * 0.7 + p) * 80 + Math.sin(px * 0.005) * 30);
        ctx.beginPath();
        ctx.arc(px, py, 1 + (p % 2), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
