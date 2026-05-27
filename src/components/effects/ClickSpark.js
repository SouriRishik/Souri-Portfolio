import { useRef, useCallback } from 'react';

export default function ClickSpark({
  children,
  sparkColor = 'var(--accent)',
  sparkCount = 8,
  sparkSize = 10,
  duration = 500,
}) {
  const containerRef = useRef(null);

  const createSpark = useCallback(
    (x, y) => {
      const container = containerRef.current;
      if (!container) return;

      const sparkContainer = document.createElement('div');
      sparkContainer.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 99999;
      `;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (i * 360) / sparkCount;
        const spark = document.createElement('div');
        const length = sparkSize + Math.random() * sparkSize;

        spark.style.cssText = `
          position: absolute;
          width: 2px;
          height: ${length}px;
          background: ${sparkColor};
          border-radius: 2px;
          transform-origin: center bottom;
          transform: rotate(${angle}deg) translateY(-2px);
          animation: sparkFly ${duration}ms ease-out forwards;
          opacity: 1;
          box-shadow: 0 0 4px ${sparkColor};
        `;

        sparkContainer.appendChild(spark);
      }

      document.body.appendChild(sparkContainer);

      setTimeout(() => {
        sparkContainer.remove();
      }, duration + 50);
    },
    [sparkColor, sparkCount, sparkSize, duration]
  );

  const handleClick = useCallback(
    (e) => {
      createSpark(e.clientX, e.clientY);
    },
    [createSpark]
  );

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{ display: 'contents' }}
    >
      {children}
    </div>
  );
}
