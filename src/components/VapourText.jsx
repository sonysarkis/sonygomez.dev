import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * VapourText — High-performance interactive text component
 * Transitions real DOM typography into canvas particle physics
 */
export default function VapourText({
  words = ['Sony Gómez'],
  fontSize = 72,
  fontFamily = "'Space Grotesk', sans-serif",
  color = '#ffffff', 
  className = '',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVaporizing, setIsVaporizing] = useState(false);

  // Find the longest word to compute intrinsic container width
  const longestWord = useMemo(() => {
    return words.reduce((a, b) => (a.length > b.length ? a : b), '');
  }, [words]);

  const config = useMemo(() => ({
    particleSize: 2,
    holdDuration: 2500, 
    vaporDuration: 1300,
    wind: 0.02,
    gravity: 0.05,
    turbulence: 1.0,
  }), []);

  useEffect(() => {
    let timeoutId;
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let particles = [];

    const resize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.offsetWidth * dpr;
      canvas.height = parent.offsetHeight * dpr;
      
      // Scale canvas resolution context for high DPI displays
      ctx.scale(dpr, dpr);
    };

    const triggerVaporize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;

      // Handle unresolved container dimensions if hidden or backgrounded
      if (w === 0 || h === 0) {
        timeoutId = setTimeout(triggerVaporize, 500);
        return;
      }
      
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });

      offCtx.fillStyle = color;
      offCtx.font = `bold ${fontSize}px ${fontFamily}`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(words[currentIndex], w / 2, h / 2);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const pixels = imageData.data;
      particles = [];

      const gap = 3; 
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx = (y * w + x) * 4;
          if (pixels[idx + 3] > 64) {
            particles.push({
              x: x,
              y: y,
              vx: 0,
              vy: 0,
              alpha: 1,
              size: config.particleSize + Math.random() * 2,
            });
          }
        }
      }

      // Initiate transition overlay
      setIsVaporizing(true);
      
      let startTime = performance.now();

      const animateSmoke = (time) => {
        const elapsed = performance.now() - startTime;
        ctx.clearRect(0, 0, w, h);

        particles.forEach((p) => {
          // Apply physics: wind vector and gravity falloff
          p.vx += (Math.random() - 0.5) * config.turbulence + config.wind;
          p.vy -= config.gravity + (Math.random() - 0.5) * config.turbulence;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
          
          const progress = elapsed / config.vaporDuration;
          p.alpha = Math.max(0, 1 - progress * 1.5); 

          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
          }
        });

        if (elapsed < config.vaporDuration) {
          animId = requestAnimationFrame(animateSmoke);
        } else {
          // Animation cycle complete, setup next text index
          ctx.clearRect(0, 0, w, h);
          setCurrentIndex((prev) => (prev + 1) % words.length);
          setIsVaporizing(false);
          // Queue initialization trigger
          timeoutId = setTimeout(() => {
            triggerVaporize();
          }, config.holdDuration);
        }
      };

      animId = requestAnimationFrame(animateSmoke);
    };

    resize();
    window.addEventListener('resize', resize);
    
    // Mount routine requires fonts resolved before rendering bounds
    document.fonts.ready.then(() => {
      timeoutId = setTimeout(() => {
        triggerVaporize();
      }, config.holdDuration);
    });

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [currentIndex, words, fontSize, fontFamily, color, config]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ height: fontSize * 1.15 }}
    >
      {/* Hidden ghost element to set dynamic flex container width bounds */}
      <span
        style={{ fontSize: `${fontSize}px`, fontFamily }}
        className="opacity-0 pointer-events-none select-none font-bold"
        aria-hidden="true"
      >
        {longestWord}
      </span>

      {/* Particle physics render layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Default initialized animated text node */}
      <AnimatePresence mode="wait">
        {!isVaporizing && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, filter: 'blur(5px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0 } }} // Bypass exit timing to match canvas render swap
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute font-bold text-center z-0 gradient-text-cyan drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            style={{ fontSize: `${fontSize}px`, fontFamily }}
          >
            {words[currentIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
