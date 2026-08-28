import React, { useEffect, useRef } from 'react';

export const HeroVideoMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for cyber grid
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#00F5FF', '#B026FF', '#39FF14', '#FF5E00', '#0070F3'];
    const particleCount = Math.min(50, Math.floor(width / 25));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle perspective grid lines
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 60;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw animated undulating wave glow
      const waveGradient = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time) * 120,
        height * 0.35 + Math.cos(time * 0.8) * 80,
        10,
        width * 0.5,
        height * 0.4,
        width * 0.6
      );
      waveGradient.addColorStop(0, 'rgba(0, 245, 255, 0.08)');
      waveGradient.addColorStop(0.4, 'rgba(176, 38, 255, 0.05)');
      waveGradient.addColorStop(0.8, 'rgba(255, 94, 0, 0.02)');
      waveGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = waveGradient;
      ctx.fillRect(0, 0, width, height);

      // Update and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background High-Tech GIF / Abstract Video Simulation */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.22] mix-blend-screen transform scale-105 filter saturate-150 contrast-125"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, rgba(0, 245, 255, 0.25) 0%, rgba(176, 38, 255, 0.2) 30%, rgba(5, 5, 10, 0.95) 75%), 
            url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2000&q=80")`,
        }}
      />

      {/* Cybernetic HUD Scanlines Layer */}
      <div 
        className="absolute inset-0 opacity-[0.18]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.65) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
          backgroundSize: '100% 3px, 6px 100%',
        }}
      />

      {/* Dynamic Animated Canvas Grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient Neon Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00F5FF]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B026FF]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[#FF5E00]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Dark Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-[#07070D]/60 to-[#06060A]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050508_90%)]" />
    </div>
  );
};
