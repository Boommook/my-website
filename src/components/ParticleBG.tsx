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
  /** Opacity of the particles */
  alpha?: number;             // default 0.2
};

export default function ParticleBG({
  density = 18000,
  color = '#ffffff',
  linkDist = 110,
  mouseDist = 150,
  speed = 0.25,
  alpha = 0.2,
}: Props) {
  // reference to the canvas element to draw on
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // get the canvas and its 2D drawing context
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    
    // calculate the device pixel ratio, because some screens are higher res than others
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    
    // Canvas dimensions
    let w = 0, h = 0;
    
    // array that will store all particle objects with position and velocity
    let particles: {x:number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }[] = [];
    
    // animation frame ID for canceling animation
    let raf = 0;
    
    // mouse position (starts off-screen)
    const mouse = { x: -9999, y: -9999 };

    // utility function to clamp a value between min and max
    const clamp = (v:number, a:number, b:number) => Math.max(a, Math.min(v, b));
    
    // utility function to get random number between min and max
    const rand = (a:number, b:number) => a + Math.random() * (b - a);

    /**
     * resize function - called when window resizes or initially
     * Sets up canvas dimensions and creates new particles
     */
    function resize() {
      // get the actual display size of the canvas
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      
      // set the internal canvas resolution (handles high-DPI displays)
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      
      // scale the drawing context to match the device pixel ratio
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // calculate how many particles to create based on screen area and density
      const count = Math.round((w * h) / density);
      
      // create array of particles with random positions and velocities
      particles = Array.from({ length: count }, () => ({
        x: rand(0, w),           // Random X position
        y: rand(0, h),           // Random Y position
        vx: rand(-speed, speed), // Random X velocity (speed)
        vy: rand(-speed, speed), // Random Y velocity (speed)
        r: rand(1, 2),           // Random radius (size)
      }));
    }

    /**
     * main drawing function - called every frame to animate the particles
     */
    function draw() {
      // clear the entire canvas
      ctx.clearRect(0, 0, w, h);

      // set opacity for particles (30% opacity)
      ctx.globalAlpha = alpha;
      
      // loop through all particles to move and draw them
      for (const p of particles) {
        // Move particle by its velocity
        p.x += p.vx; 
        p.y += p.vy;
        
        // bounce off edges - reverse velocity when hitting boundaries
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // draw the particle as a circle
        ctx.beginPath();
        // 2PI is a full circle
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // set details for the lines
      ctx.globalAlpha = 0.4; 
      ctx.strokeStyle = color;
      
        // link particles to each other
        // for each particle...      
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            
          // for each other particle
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            // calculate the distance between the two particles
            const dx = a.x - b.x
            const dy = a.y - b.y;
            // find hypotenuse (squared) of the distance between the two particles
            const hypotenuse = dx*dx + dy*dy;
            
            // if particles are close enough, draw a line between them
            if (hypotenuse < linkDist * linkDist) {
                // draw a line between the two particles
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
          }
            
          // calculate the distance between the particle and the mouse
          const dxm = a.x - mouse.x
          const dym = a.y - mouse.y;
          const hypotenuseMouse = dxm*dxm + dym*dym;
          
          // if particle is close to mouse, draw line to mouse
          if (hypotenuseMouse < mouseDist * mouseDist) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

      // schedule the next frame
      raf = requestAnimationFrame(draw);
    }

    /**
     * start the animation loop
     */
    function start() {      
      resize();  // set up canvas and particles
      cancelAnimationFrame(raf);  // cancel any existing animation
      draw();    // start the drawing loop
    }

    // event handlers for mouse and window interactions
    
    /**
     * track mouse movement over the canvas
     */
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // convert mouse position to canvas coordinates
      mouse.x = clamp(e.clientX - rect.left, 0, w);
      mouse.y = clamp(e.clientY - rect.top, 0, h);
    };
    
    /**
     * hide mouse when it leaves the canvas
     */
    const onMouseLeave = () => { 
      mouse.x = -9999; 
      mouse.y = -9999; 
    };
    
    /**
     * handle window resize
     */
    const onResize = () => { 
      resize(); 
    };
    
    /**
     * handle page visibility changes (tab switching, minimizing)
     */
    const onVis = () => {
      if (document.hidden) 
        cancelAnimationFrame(raf);  // stop animation when hidden
      else 
        start();                    // Resume animation when visible
    };

    // performance optimization: reduce particles on small screens
    if (Math.min(window.innerWidth, window.innerHeight) < 640) {
      density = density * 1.8; // Fewer particles on mobile
    }

    // initialize everything
    start();
    
    // Add event listeners
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVis);

    // cleanup function
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [color, linkDist, mouseDist, speed, density]);

  // return the canvas element
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden
    />
  );
}
