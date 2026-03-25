import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import VapourText from './VapourText';

const WHATSAPP_LINK = 'https://wa.me/5804124007847';

/* ── Animated particle web canvas ── */
function ParticleWeb() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let resizeObserver;

    const initParticles = () => {
      particles = [];
      const spacing = 70;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            baseX: i * spacing,
            baseY: j * spacing,
            x: i * spacing,
            y: j * spacing,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Sync drawing buffer dimensions with parent DOM element
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    const onMouseMove = (e) => {
      // Map local boundaries to exact document layout regardless of scroll offsets
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      // Reset internal tracker when mouse leaves the section bounds
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const maxDist = 250;

      particles.forEach((p) => {
        const dx = mouse.x - p.baseX;
        const dy = mouse.y - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 35;
          p.vx += (dx / dist) * force * 0.015;
          p.vy += (dy / dist) * force * 0.015;
        }

        p.vx += (p.baseX - p.x) * 0.03;
        p.vy += (p.baseY - p.y) * 0.03;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        const distToMouse = Math.sqrt((mouse.x - p.x) ** 2 + (mouse.y - p.y) ** 2);
        const alpha = distToMouse < maxDist
          ? 0.2 + (1 - distToMouse / maxDist) * 0.7
          : 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.fill();
      });

      // Draw connecting lines between nearing particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const distToMouse = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);
            const alpha = distToMouse < 280
              ? 0.08 + (1 - distToMouse / 280) * 0.35
              : 0.08;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    if (canvas.parentElement) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas.parentElement);
      canvas.parentElement.addEventListener('mouseleave', onMouseLeave);
    } else {
      window.addEventListener('resize', resize);
    }
    
    resize();
    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', resize);
      }
      if (canvas.parentElement) {
        // Cleanup mouse events and observer refs on teardown
        canvas.parentElement.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Particle Web */}
      <ParticleWeb />

      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[150px] animate-float" />
        <div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent-cyan/8 rounded-full blur-[120px]"
          style={{ animation: 'float 8s ease-in-out infinite 3s' }}
        />
      </div>

      {/* Content */}
      <div className="relative px-8 sm:px-12 lg:px-20 pt-28 pb-20 text-center max-w-5xl mx-auto w-full flex flex-col items-center justify-center min-h-[85vh]" style={{ zIndex: 10 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass mb-6"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-sm text-dark-100 font-medium">Disponible para proyectos</span>
        </motion.div>

        {/* Heading with static text + VapourText for name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-1"
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.08] text-white">
            Creo <span className="gradient-text">experiencias</span>
          </h1>
        </motion.div>

        {/* VapourText animated name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-1"
        >
          <VapourText
            words={['digitales', 'modernas', 'únicas']}
            fontSize={typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 80}
            className="mx-auto max-w-4xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.08] text-white mb-10 drop-shadow-lg">
            que <span className="gradient-text-pink">impactan</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl text-dark-200 max-w-2xl mx-auto mb-14 leading-relaxed text-center"
        >
          Desarrollador web especializado en crear páginas modernas, interactivas
          y de alto rendimiento. Desde landing pages hasta aplicaciones con{' '}
          <span className="text-accent-cyan font-medium">inteligencia artificial</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
        >
          <a
            href="#projects"
            className="group px-12 py-5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold text-lg hover:shadow-2xl hover:shadow-accent-purple/30 transition-all duration-500 hover:scale-105 flex items-center gap-3"
          >
            Ver Proyectos
            <HiArrowDown className="text-xl group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 rounded-2xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
          >
            Contáctame
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-3 gap-16 max-w-md mx-auto"
        >
          {[
            { number: '3+', label: 'Proyectos' },
            { number: '100%', label: 'Satisfacción' },
            { number: '∞', label: 'Creatividad' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl sm:text-4xl font-bold gradient-text">
                {stat.number}
              </div>
              <div className="text-sm text-dark-300 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
