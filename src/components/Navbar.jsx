import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

const WHATSAPP_LINK = 'https://wa.me/5804124007847';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      setActiveSection('#' + current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-2xl ${
        scrolled
          ? 'glass-strong shadow-2xl shadow-accent-purple/10'
          : 'bg-dark-900/50 backdrop-blur-md border border-white/5'
      }`}
      style={{ width: 'min(94%, 1100px)' }}
    >
      <div className="px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center font-heading font-bold text-white text-sm transition-transform duration-300 group-hover:scale-110">
            S
          </div>
          <span className="font-heading font-semibold text-base text-white hidden sm:block">
            Sony<span className="text-accent-purple">Gómez</span>
          </span>
        </a>

        {/* Desktop Links — Pill with liquid glass active */}
        <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === link.href
                  ? 'text-white'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              {activeSection === link.href && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-lg bg-white/[0.1] border border-white/[0.15] shadow-lg shadow-accent-purple/15"
                  style={{ backdropFilter: 'blur(16px)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        {/* CTA Button → WhatsApp */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-semibold hover:shadow-xl hover:shadow-accent-purple/25 transition-all duration-300 hover:scale-105 shrink-0"
        >
          Contáctame Aquí
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white text-xl p-2.5 rounded-lg hover:bg-white/5 transition-colors"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5"
          >
            <div className="px-6 py-5 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === link.href
                      ? 'text-white bg-white/[0.08] border border-white/10'
                      : 'text-dark-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-center font-semibold"
              >
                Contáctame Aquí
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
