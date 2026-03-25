import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiVercel,
  SiGit,
  SiFramer,
  SiThreedotjs,
  SiOpenai,
} from 'react-icons/si';
import { HiCode, HiLightningBolt, HiSparkles, HiGlobe } from 'react-icons/hi';
import SpotlightCard from './SpotlightCard';
import CursorGlowTrail from './CursorGlowTrail';

const skills = [
  { icon: SiReact, name: 'React', color: '#61dafb' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06b6d4' },
  { icon: SiJavascript, name: 'JavaScript', color: '#f7df1e' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { icon: SiThreedotjs, name: 'Three.js', color: '#ffffff' },
  { icon: SiFramer, name: 'Framer Motion', color: '#bb4bff' },
  { icon: SiOpenai, name: 'OpenAI', color: '#10a37f' },
  { icon: SiVercel, name: 'Vercel', color: '#ffffff' },
  { icon: SiGit, name: 'Git', color: '#f05032' },
];

const strengths = [
  {
    icon: HiCode,
    title: 'Desarrollo Premium',
    description: 'Código limpio, optimizado y profesional. Cada línea cuenta.',
  },
  {
    icon: HiLightningBolt,
    title: 'Rendimiento',
    description: 'Páginas rápidas que cargan al instante y rankean en Google.',
  },
  {
    icon: HiSparkles,
    title: 'Diseño Moderno',
    description: 'Interfaces que impactan. Dark modes, glassmorphism, animaciones fluidas.',
  },
  {
    icon: HiGlobe,
    title: 'Experiencia Completa',
    description: 'Desde la idea hasta el deploy. Diseño, desarrollo y puesta en producción.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative pt-16 pb-16 overflow-hidden">
      {/* Cursor Glow Trail — interactive canvas */}
      <CursorGlowTrail />

      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-accent-cyan uppercase tracking-[0.25em]">
            Sobre Mí
          </span>

          {/* Personal Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 mb-10 flex justify-center"
          >
            <div className="relative group">
              {/* Glow ring behind photo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-purple via-accent-cyan to-accent-pink opacity-60 blur-xl group-hover:opacity-80 transition-opacity duration-500 scale-110" />
              {/* Photo container */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl shadow-accent-purple/20">
                <img
                  src="/images/sony-gomez.png"
                  alt="Sony Gómez — Desarrollador Web"
                  className="w-full h-full object-cover object-[center_75%]" 
                />
              </div>
            </div>
          </motion.div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            Hola, soy{' '}
            <span className="gradient-text-pink">Sony Gómez</span>
          </h2>
          <p className="text-dark-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-center">
            Desarrollador web apasionado por crear experiencias digitales que no solo se ven increíbles,
            sino que generan resultados reales para mis clientes. Combino diseño de vanguardia con
            tecnología moderna para construir soluciones que destacan.
          </p>
        </motion.div>

        {/* Strengths Grid — with SpotlightCard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28"
        >
          {strengths.map((item) => (
            <SpotlightCard
              key={item.title}
              spotlightColor="rgba(139, 92, 246, 0.35)"
              className="group"
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="text-2xl text-accent-purple" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-dark-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white mb-12">
            Tecnologías que Domino
          </h3>
          <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.1, y: -4 }}
                className="glass rounded-xl px-6 py-4 flex items-center gap-4 cursor-default hover:border-accent-purple/30 transition-all duration-300"
              >
                <skill.icon style={{ color: skill.color }} className="text-xl" />
                <span className="text-sm font-medium text-dark-100">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
