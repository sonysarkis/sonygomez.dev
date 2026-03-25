import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * SpotlightCard — A card wrapper where the border glows following the mouse cursor.
 * Inspired by 21st.dev Spotlight Card component.
 */
export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(139, 92, 246, 0.4)' }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setOpacity(1), []);
  const handleMouseLeave = useCallback(() => setOpacity(0), []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-dark-800/50 backdrop-blur-sm ${className}`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight glow on the border — follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(700px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Inner border glow */}
      <div
        className="pointer-events-none absolute inset-px rounded-2xl transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.12), transparent 40%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
