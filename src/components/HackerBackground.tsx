import React, { useEffect, useRef } from "react";

export default function HackerBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Grid details for Matrix rain
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const matrixChars = "0101ABCDX01YZEFCTFNULLORIGIN0101";

    const draw = () => {
      // Fade out background to create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(34, 197, 94, 0.35)"; // Tailwind green-500 equivalent with opacity
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character
        ctx.fillText(char, x, y);

        // Reset drops if they go off screen
        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        // Speed of falling code
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      // Re-initialize drops if columns count changed
      if (newColumns !== drops.length) {
        drops.length = newColumns;
        drops.fill(1);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Black ambient canvas */}
      <div className="absolute inset-0 bg-[#020202]"></div>
      
      {/* Matrix falling code on canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.08]" />

      {/* Cyber Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      ></div>

      {/* Scanline overlay effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))",
          backgroundSize: "100% 4px, 6px 100%"
        }}
      ></div>

      {/* Retro flickering screen glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.65))]"></div>
    </div>
  );
}
