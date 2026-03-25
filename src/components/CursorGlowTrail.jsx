import { useEffect, useRef } from 'react';

/**
 * CursorGlowTrail — Canvas overlay that draws colorful glowing trails following the cursor.
 * Trails fade out over time creating a liquid-like glow effect.
 */
export default function CursorGlowTrail({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const trails = [];
    let mouse = { x: -1000, y: -1000 };
    let lastMouse = { x: -1000, y: -1000 };

    const colors = [
      'rgba(139, 92, 246, ',  // purple
      'rgba(6, 182, 212, ',   // cyan
      'rgba(236, 72, 153, ',  // pink
    ];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const onMouseMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Only add trail points if mouse is inside the section
      if (mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height) {
        const speed = Math.sqrt((mouse.x - lastMouse.x) ** 2 + (mouse.y - lastMouse.y) ** 2);
        if (speed > 2) {
          const colorIdx = Math.floor(Math.random() * colors.length);
          trails.push({
            x: mouse.x,
            y: mouse.y,
            color: colors[colorIdx],
            alpha: 0.5,
            radius: 20 + Math.random() * 30,
            decay: 0.012 + Math.random() * 0.008,
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.alpha -= t.decay;
        t.radius += 0.3;

        if (t.alpha <= 0) {
          trails.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.radius);
        gradient.addColorStop(0, `${t.color}${t.alpha})`);
        gradient.addColorStop(1, `${t.color}0)`);

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
