import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

function DockItem({ link, activeSection, scrollTo, mouseX }) {
  const ref = React.useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Math perfectly matches React Bits Dock: distance 200px, magnification 1.4x
  const scaleSync = useTransform(distance, [-200, 0, 200], [1, 1.4, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  // To simulate the Dock expanding layout width (since scale is purely visual)
  // we add a tiny bit of horizontal padding/margin that scales with distance.
  const paddingSync = useTransform(distance, [-200, 0, 200], [16, 24, 16]); // px-4 is 16px
  const padding = useSpring(paddingSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={link.href}
      onClick={(e) => scrollTo(e, link.href)}
      className="relative py-2 text-sm font-medium transition-colors rounded-full whitespace-nowrap"
      style={{
        scale,
        paddingLeft: padding,
        paddingRight: padding,
        color: activeSection === link.href ? 'var(--text-primary)' : 'var(--text-secondary)',
      }}
    >
      <AnimatePresence>
        {activeSection === link.href && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'var(--glass-border)' }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{link.label}</span>
    </motion.a>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['contact', 'projects', 'about', 'hero'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection('#' + id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 w-full z-50 flex justify-center px-4"
        style={{ pointerEvents: 'none' }}
      >
        <div 
          className="glass-nav-pill w-full max-w-[95vw] sm:max-w-md md:max-w-none md:w-auto px-4 py-2 flex items-center justify-between gap-4"
          style={{ pointerEvents: 'auto' }}
        >
          <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="pl-2 no-underline flex items-center shrink-0">
            <span className="text-xl font-display font-bold gradient-text tracking-tight">
              Souri.
            </span>
          </a>

          {/* Desktop nav */}
          <div 
            className="hidden md:flex items-center gap-1"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          >
            {navLinks.map((link) => (
              <DockItem 
                key={link.href}
                link={link}
                activeSection={activeSection}
                scrollTo={scrollTo}
                mouseX={mouseX}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 pr-1 shrink-0">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ background: 'var(--glass-border)', color: 'var(--text-primary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-full flex flex-col justify-center items-center gap-1.5 transition-all hover:scale-105"
              style={{ background: 'var(--glass-border)', color: 'var(--text-primary)' }}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[2px] rounded-full bg-current"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-[2px] rounded-full bg-current"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[2px] rounded-full bg-current"
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
            style={{ 
              background: 'var(--glass-bg)', 
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)' 
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-3xl font-display font-medium tracking-tight"
                style={{
                  color: activeSection === link.href ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
