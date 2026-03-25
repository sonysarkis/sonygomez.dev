import { motion } from 'framer-motion';
import { HiLocationMarker } from 'react-icons/hi';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

const WHATSAPP_LINK = 'https://wa.me/5804124007847';

const socials = [
  { icon: SiGithub, href: 'https://github.com/sonysarkis', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sonysarkis', label: 'LinkedIn' },
  { icon: SiWhatsapp, href: WHATSAPP_LINK, label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-16 pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent-purple/8 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            ¿Tienes un proyecto{' '}
            <span className="gradient-text">en mente</span>?
          </h2>
          <p className="text-dark-200 text-lg sm:text-xl max-w-xl mx-auto mb-14 leading-relaxed">
            Estoy listo para llevar tu idea al siguiente nivel.
            Hablemos sobre cómo puedo ayudarte a crear algo extraordinario.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold text-lg hover:shadow-2xl hover:shadow-accent-purple/30 transition-all duration-500 hover:scale-105 animate-pulse-glow"
          >
            <SiWhatsapp className="text-2xl" />
            Envíame un Mensaje
          </a>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent mb-16" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center font-heading font-bold text-white text-lg">
              S
            </div>
            <div>
              <span className="font-heading font-semibold text-white text-lg">
                Sony<span className="text-accent-purple">Gómez</span>
              </span>
              <div className="flex items-center gap-2 text-sm text-dark-300 mt-1">
                <HiLocationMarker />
                <span>Web Developer</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-dark-200 hover:text-white hover:border-accent-purple/30 transition-all duration-300 hover:scale-110"
              >
                <social.icon className="text-xl" />
              </a>
            ))}
          </div>

          <p className="text-sm text-dark-400">
            © {new Date().getFullYear()} Sony Gómez. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
