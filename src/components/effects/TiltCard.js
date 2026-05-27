import { useRef, useState, useCallback } from 'react';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
  perspective = 1000,
  glareEnable = true,
  glareMaxOpacity = 0.15,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      );

      if (glareEnable) {
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
        const opacity = (distance / maxDistance) * glareMaxOpacity;

        setGlareStyle({
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          borderRadius: 'inherit',
          background: `linear-gradient(${angle}deg, rgba(255,255,255,${opacity}) 0%, transparent 60%)`,
          transition: 'opacity 0.2s ease',
          opacity: 1,
        });
      }
    },
    [maxTilt, scale, perspective, glareEnable, glareMaxOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('');
    setIsHovered(false);
    setGlareStyle({});
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      {children}
      {glareEnable && isHovered && <div style={glareStyle} />}
    </div>
  );
}
