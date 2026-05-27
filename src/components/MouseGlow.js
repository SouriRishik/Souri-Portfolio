import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let raf;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let hue = 0;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      hue = (hue + 0.15) % 360;

      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      glow.style.background = `radial-gradient(circle, 
        rgba(var(--accent-rgb), 0.12) 0%, 
        rgba(168, 85, 247, 0.06) 30%,
        transparent 65%)`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 65%)',
        filter: 'blur(50px)',
        opacity: 0.7,
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
    />
  );
}
