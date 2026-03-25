import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiExternalLink, HiEye } from 'react-icons/hi';
import SpotlightCard from './SpotlightCard';

const projects = [
  {
    id: 1,
    title: 'Consultora LCE',
    subtitle: 'Consultoría en Innovación Industrial',
    description:
      'Startup de consultoría especializada en Lean Innovation 4.0 para empresas industriales. Incluye servicios en petróleo y gas, ingeniería, tratamiento de aguas y manejo de riesgos. Diseño dark-mode con un globo wireframe interactivo y efectos glow.',
    image: '/projects/consultoralce.png',
    url: 'https://consultoralce.vercel.app/',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    accent: '#10b981',
  },
  {
    id: 2,
    title: 'Super Motors',
    subtitle: 'Landing Page Automotriz con Modelo 3D',
    description:
      'Landing page premium para concesionario de vehículos en Atlanta. Cuenta con un modelo 3D interactivo rotación 360°, galería de inventario, métricas de confianza y formulario de captación de leads. "No solo carros, experiencias."',
    image: '/projects/aulandingcar.png',
    url: 'https://aulandingcar.vercel.app/',
    tags: ['React', 'Three.js', 'Next.js', 'Tailwind CSS'],
    accent: '#84cc16',
  },
  {
    id: 3,
    title: 'AutoVoz — Agente IA',
    subtitle: 'Dashboard con Agente de Voz en Tiempo Real',
    description:
      'Aplicación compleja con inteligencia artificial: un agente de voz en tiempo real para concesionarios que conversa con clientes, extrae datos (presupuesto, uso, crédito) y recomienda vehículos personalizados. Dashboard interactivo con perfil dinámico.',
    image: '/projects/autovoz-dashboard.png',
    url: 'https://agente-voz-sonygomez.vercel.app/',
    tags: ['React', 'OpenAI API', 'Web Speech API', 'Vite'],
    accent: '#8b5cf6',
  },
];

/* Floating orbs that parallax with scroll */
const floatingOrbs = [
  { top: '15%', left: '5%', size: 180, color: 'rgba(139,92,246,0.08)', blur: 80, speed: 0.3 },
  { top: '35%', right: '3%', size: 220, color: 'rgba(6,182,212,0.07)', blur: 100, speed: -0.2 },
  { top: '55%', left: '8%', size: 160, color: 'rgba(236,72,153,0.06)', blur: 90, speed: 0.4 },
  { top: '75%', right: '6%', size: 200, color: 'rgba(139,92,246,0.06)', blur: 110, speed: -0.35 },
  { top: '25%', left: '50%', size: 140, color: 'rgba(16,185,129,0.05)', blur: 70, speed: 0.25 },
  { top: '65%', left: '30%', size: 190, color: 'rgba(6,182,212,0.05)', blur: 95, speed: -0.15 },
];

function ScrollParallaxOrb({ orb, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], ['0px', `${orb.speed * 300}px`]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        top: orb.top,
        left: orb.left,
        right: orb.right,
        width: orb.size,
        height: orb.size,
        background: orb.color,
        filter: `blur(${orb.blur}px)`,
        y,
      }}
    />
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="projects" ref={sectionRef} className="relative pt-32 pb-16 overflow-hidden">
      {/* Radial glow top */}
      <div className="absolute inset-0 bg-radial-top pointer-events-none" />

      {/* Floating parallax orbs */}
      {floatingOrbs.map((orb, i) => (
        <ScrollParallaxOrb key={i} orb={orb} scrollYProgress={scrollYProgress} />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-28"
        >
          <span className="text-sm font-medium text-accent-purple uppercase tracking-[0.25em]">
            Portafolio
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-5 mb-8">
            Proyectos{' '}
            <span className="gradient-text">Destacados</span>
          </h2>
          <p className="text-dark-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Cada proyecto es creado con atención al detalle, rendimiento y una
            experiencia de usuario excepcional.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard
                spotlightColor={`${project.accent}40`}
                className="overflow-hidden"
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-12 lg:gap-16 items-center p-8 sm:p-10 lg:p-14`}>
                  {/* Screenshot */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 to-accent-cyan/20 blur-3xl opacity-30 rounded-full" />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group relative z-10"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl glass-strong">
                        {/* Browser Bar */}
                        <div className="bg-dark-800/80 px-5 py-3 flex items-center gap-4 border-b border-white/10 backdrop-blur-md">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                          </div>
                          <div className="flex-1 mx-3">
                            <div className="bg-dark-900/50 rounded-lg px-4 py-1.5 text-xs text-dark-300 font-mono truncate text-center border border-white/5">
                              {project.url}
                            </div>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative overflow-hidden aspect-[16/10] bg-dark-900">
                          <img
                            src={project.image}
                            alt={`${project.title} — ${project.subtitle}`}
                            className="w-full h-full object-cover object-top transition-all duration-[5000ms] ease-in-out group-hover:object-bottom rounded-b-2xl"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 border-t border-white/5">
                            <span className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold text-sm border border-white/20 shadow-xl transition-transform duration-300 hover:scale-105">
                              <HiExternalLink className="text-lg" />
                              Visitar Proyecto
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Info */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
                    <div>
                      <span
                        className="text-sm font-semibold uppercase tracking-[0.2em]"
                        style={{ color: project.accent }}
                      >
                        Proyecto {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3">
                        {project.title}
                      </h3>
                      <p className="text-accent-cyan text-base mt-2 font-medium">{project.subtitle}</p>
                    </div>

                    <p className="text-dark-200 leading-relaxed text-base lg:text-lg">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tech-badge bg-white/5 border-white/10 text-dark-100 px-4 py-1.5 rounded-lg text-sm">{tag}</span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`,
                          boxShadow: `0 10px 30px ${project.accent}33`,
                        }}
                      >
                        <HiEye className="text-lg" />
                        Ver en Vivo
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
