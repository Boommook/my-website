'use client';
import { useEffect, useRef } from 'react';

type Props = {
  /** Smaller numbers = fewer particles (good for heavy pages/mobile) */
  density?: number;           // default 18000 (pixels per particle)
  /** Particle/link color */
  color?: string;             // default '#ffffff'
  /** Link distance in px */
  linkDist?: number;          // default 110
  /** Mouse link distance in px */
  mouseDist?: number;         // default 150
  /** Max speed in px/frame */
  speed?: number;             // default 0.25
};

export default function ParticleBG({
  density = 18000,
  color = '#ffffff',
  linkDist = 110,
  mouseDist = 150,
  speed = 0.25,
}: Props) {
  // Reference to the canvas element for drawing
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Get the canvas and its 2D drawing context
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    
    // Device Pixel Ratio - handles high-DPI displays (like Retina screens)
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    
    // Check if user prefers reduced motion (accessibility feature)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Canvas dimensions
    let w = 0, h = 0;
    
    // Array to store all particle objects with position and velocity
    let particles: {x:number;y:number;vx:number;vy:number;r:number}[] = [];
    
    // Animation frame ID for canceling animation
    let raf = 0;
    
    // Mouse position (starts off-screen)
    const mouse = { x: -9999, y: -9999 };

    // Utility function to clamp a value between min and max
    const clamp = (v:number, a:number, b:number) => Math.max(a, Math.min(v, b));
    
    // Utility function to get random number between min and max
    const rand = (a:number, b:number) => a + Math.random() * (b - a);

    /**
     * Resize function - called when window resizes or initially
     * Sets up canvas dimensions and creates new particles
     */
    function resize() {
      // Get the actual display size of the canvas
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      
      // Set the internal canvas resolution (handles high-DPI displays)
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      
      // Scale the drawing context to match the device pixel ratio
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // Calculate how many particles to create based on screen area and density
      const count = Math.round((w * h) / density);
      
      // Create array of particles with random positions and velocities
      particles = Array.from({ length: count }, () => ({
        x: rand(0, w),           // Random X position
        y: rand(0, h),           // Random Y position
        vx: rand(-speed, speed), // Random X velocity (speed)
        vy: rand(-speed, speed), // Random Y velocity (speed)
        r: rand(1, 2),           // Random radius (size)
      }));
    }

    /**
     * Main drawing function - called every frame to animate the particles
     */
    function draw() {
      // Clear the entire canvas
      ctx.clearRect(0, 0, w, h);

      // Set opacity for particles (30% opacity)
      ctx.globalAlpha = 0.2;
      
      // Loop through all particles to move and draw them
      for (const p of particles) {
        // Move particle by its velocity
        p.x += p.vx; 
        p.y += p.vy;
        
        // Bounce off edges - reverse velocity when hitting boundaries
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Draw the particle as a circle
        ctx.beginPath();
        // 2PI is a full circle
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Draw connecting lines between particles
      ctx.globalAlpha = 0.1;  // Very transparent lines
      ctx.strokeStyle = color;
      
        // link particles
        // for each particle...      
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            
            // for each other particle...
            for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            // find hypotenuse (squared) of the distance between the two particles
            const d2 = dx*dx + dy*dy;
            
            // If particles are close enough, draw a line between them
            if (d2 < linkDist * linkDist) {
                // draw a line between the two particles
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
            }
            
            // Connect particles to mouse cursor within mouseDist
            const dxm = a.x - mouse.x, dym = a.y - mouse.y;
            const d2m = dxm*dxm + dym*dym;
            
            // If particle is close to mouse, draw line to mouse
            if (d2m < mouseDist * mouseDist) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            }
        }

      // Schedule the next frame
      raf = requestAnimationFrame(draw);
    }

    /**
     * Start the animation loop
     */
    function start() {
      // Don't start if user prefers reduced motion
      if (prefersReduced) return;
      
      resize();  // Set up canvas and particles
      cancelAnimationFrame(raf);  // Cancel any existing animation
      draw();    // Start the drawing loop
    }

    // Event handlers for mouse and window interactions
    
    /**
     * Track mouse movement over the canvas
     */
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Convert mouse position to canvas coordinates
      mouse.x = clamp(e.clientX - rect.left, 0, w);
      mouse.y = clamp(e.clientY - rect.top, 0, h);
    };
    
    /**
     * Hide mouse when it leaves the canvas
     */
    const onMouseLeave = () => { 
      mouse.x = -9999; 
      mouse.y = -9999; 
    };
    
    /**
     * Handle window resize
     */
    const onResize = () => { 
      resize(); 
    };
    
    /**
     * Handle page visibility changes (tab switching, minimizing)
     */
    const onVis = () => {
      if (document.hidden) 
        cancelAnimationFrame(raf);  // Stop animation when hidden
      else 
        start();                    // Resume animation when visible
    };

    // Performance optimization: reduce particles on small screens
    if (Math.min(window.innerWidth, window.innerHeight) < 640) {
      density = density * 1.8; // Fewer particles on mobile
    }

    // Initialize everything
    start();
    
    // Add event listeners
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVis);

    // Cleanup function - remove event listeners and stop animation
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [color, linkDist, mouseDist, speed, density]);

  // Return the canvas element
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden
    />
  );
}
