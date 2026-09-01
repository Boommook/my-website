"use client";

import { useEffect, useRef } from "react";

type Props = { density?: number; color?: string; linkDist?: number; mouseDist?: number; speed?: number; alpha?: number };
type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export default function ParticleBG({ density = 18000, color = "#ffffff", linkDist = 110, mouseDist = 150, speed = 0.25, alpha = 0.3 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.25 : 2);
    const mobileDensity = window.innerWidth < 640 ? density * 1.8 : density;
    const maxParticles = window.innerWidth < 640 ? 45 : 100;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let resizeRaf = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const nextBufferWidth = Math.max(1, Math.floor(nextWidth * dpr));
      const nextBufferHeight = Math.max(1, Math.floor(nextHeight * dpr));
      if (nextWidth === width && nextHeight === height && canvas.width === nextBufferWidth && canvas.height === nextBufferHeight) {
        return false;
      }
      width = nextWidth;
      height = nextHeight;
      canvas.width = nextBufferWidth;
      canvas.height = nextBufferHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(maxParticles, Math.round((width * height) / mobileDensity));
      particles = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-speed, speed),
        vy: rand(-speed, speed),
        r: 2,
      }));
      return true;
    };

    const draw = (move = true) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      for (const particle of particles) {
        if (move) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < linkDist * linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dx = a.x - mouse.x;
        const dy = a.y - mouse.y;
        if (dx * dx + dy * dy < mouseDist * mouseDist) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };
    const animate = () => {
      draw();
      raf = requestAnimationFrame(animate);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reducedMotion.matches) draw(false);
      else animate();
    };
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        if (resize()) start();
      });
    };
    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibilityChange = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    };
    const onMotionChange = () => start();

    resize();
    start();
    const observer = new ResizeObserver(onResize);
    observer.observe(canvas);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, [alpha, color, density, linkDist, mouseDist, speed]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 -z-10 h-full min-h-full w-full" aria-hidden />;
}
