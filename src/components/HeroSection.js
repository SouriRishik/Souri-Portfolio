import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '@/components/effects/DecryptedText';

const roles = [
  'Full-Stack Developer',
  'Machine Learning Engineer',
  'Data Science Engineer',
  'Software Developer',
];

function useRotatingText(words, interval = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);
  
  return words[index];
}

export default function HeroSection() {
  const currentRole = useRotatingText(roles, 3500);
  const [roleKey, setRoleKey] = useState(0);

  useEffect(() => {
    setRoleKey((prev) => prev + 1);
  }, [currentRole]);

  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 pt-36 md:pt-24 pb-12 overflow-hidden">
      
      {/* Ambient Lighting Background */}
      <div className="ambient-light-container">
        <div className="ambient-light ambient-1"></div>
        <div className="ambient-light ambient-2"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16">
        
        {/* LEFT COLUMN: Big Square Image */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full md:w-1/2 lg:w-5/12 max-w-md flex-shrink-0"
        >
          <div className="w-full aspect-square rounded-[32px] overflow-hidden p-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-2xl shadow-[var(--glass-shadow)] hover:scale-[1.02] transition-transform duration-500">
            <div className="w-full h-full rounded-[24px] overflow-hidden">
              <img 
                src="/images/linkedin_photo.jpeg" 
                alt="Souri Rishik" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Text Content */}
        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="font-mono text-xs sm:text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>
              Software Engineering • ML • Data Science
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tighter leading-none mb-6 whitespace-nowrap -ml-0 sm:-ml-2"
          >
            Souri <span className="gradient-text">Rishik</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-8 sm:h-10 mb-6 text-xl sm:text-2xl font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            <DecryptedText
              key={roleKey}
              text={currentRole}
              speed={40}
              delay={200}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg mb-10 max-w-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            I'm a Data Science & Engineering student at MIT, Manipal. I architect scalable software and train intelligent machine learning models, transforming raw data into high-performance applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="apple-btn-primary w-full sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="/SouriRishik_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-secondary w-full sm:w-auto"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
