import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BlurText({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.08,
  duration = 0.6,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  if (!text) {
    return (
      <motion.span
        ref={ref}
        className={className}
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration, delay }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{
            opacity: 0,
            filter: 'blur(14px)',
            y: 8,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }
              : {}
          }
          transition={{
            duration,
            delay: delay + i * staggerDelay,
            ease: 'easeOut',
          }}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter',
          }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}
