import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function getRandomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export default function DecryptedText({
  text = '',
  speed = 50,
  delay = 0,
  className = '',
  revealDirection = 'start',
  onComplete,
  sequential = true,
  useOriginalCharsOnly = false,
  animateOn = 'mount',
}) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef(null);
  const revealedRef = useRef(0);
  const containerRef = useRef(null);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    revealedRef.current = 0;

    const chars = text.split('');
    const totalChars = chars.length;

    intervalRef.current = setInterval(() => {
      revealedRef.current += 1;
      const revealed = revealedRef.current;

      if (revealed >= totalChars) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsAnimating(false);
        setHasAnimated(true);
        onComplete?.();
        return;
      }

      const newText = chars.map((char, i) => {
        if (char === ' ') return ' ';
        const revealIndex = revealDirection === 'end' ? totalChars - 1 - i : i;
        if (revealIndex < revealed) return char;
        if (sequential && revealIndex === revealed) {
          return Math.random() > 0.5 ? char : getRandomChar();
        }
        return getRandomChar();
      }).join('');

      setDisplayText(newText);
    }, speed);
  }, [text, speed, revealDirection, sequential, isAnimating, onComplete]);

  useEffect(() => {
    if (animateOn === 'mount' && !hasAnimated) {
      const timer = setTimeout(startAnimation, delay);
      return () => clearTimeout(timer);
    }
  }, [animateOn, delay, startAnimation, hasAnimated]);

  useEffect(() => {
    if (animateOn === 'view' && !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(startAnimation, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, delay, startAnimation, hasAnimated]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Initial text shows scrambled characters
  useEffect(() => {
    if (!displayText && !hasAnimated) {
      setDisplayText(text.split('').map(c => c === ' ' ? ' ' : getRandomChar()).join(''));
    }
  }, [text, displayText, hasAnimated]);

  return (
    <motion.span
      ref={containerRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'inline-block',
        fontFamily: 'inherit',
        whiteSpace: 'pre-wrap',
      }}
    >
      {(displayText || text).split('').map((char, i) => {
        const isRevealed = hasAnimated || (isAnimating && i < revealedRef.current);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              color: isRevealed ? 'inherit' : 'var(--accent)',
              transition: 'color 0.1s ease',
              minWidth: char === ' ' ? '0.3em' : undefined,
            }}
          >
            {char}
          </span>
        );
      })}
    </motion.span>
  );
}
