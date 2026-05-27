import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function SplitText({
  text = '',
  className = '',
  delay = 0,
  charDelay = 0.035,
  duration = 0.6,
  ease = 'easeOut',
  as: Tag = 'span',
}) {
  const characters = useMemo(() => {
    const chars = [];
    let charIndex = 0;
    text.split(' ').forEach((word, wordIdx) => {
      if (wordIdx > 0) {
        chars.push({ char: '\u00A0', key: `space-${wordIdx}`, index: charIndex++ });
      }
      word.split('').forEach((c) => {
        chars.push({ char: c, key: `char-${charIndex}`, index: charIndex++ });
      });
    });
    return chars;
  }, [text]);

  return (
    <Tag className={className} style={{ display: 'inline-block' }}>
      {characters.map(({ char, key, index }) => (
        <motion.span
          key={key}
          initial={{
            opacity: 0,
            y: 40,
            filter: 'blur(10px)',
            rotateX: -90,
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            rotateX: 0,
          }}
          transition={{
            duration,
            delay: delay + index * charDelay,
            ease,
          }}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter',
            transformOrigin: 'bottom center',
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}
