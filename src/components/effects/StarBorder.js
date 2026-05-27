export default function StarBorder({
  children,
  as: Tag = 'div',
  className = '',
  color = 'rgba(129, 140, 248, 0.7)',
  speed = '6s',
  style = {},
  ...props
}) {
  return (
    <Tag
      className={`star-border-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        borderRadius: '14px',
        overflow: 'hidden',
        padding: '2px',
        ...style,
      }}
      {...props}
    >
      {/* Animated border gradient */}
      <div
        style={{
          position: 'absolute',
          inset: '-200%',
          background: `conic-gradient(from 0deg, transparent 0deg, ${color} 60deg, transparent 120deg)`,
          animation: `starRotate ${speed} linear infinite`,
          zIndex: 0,
        }}
      />
      {/* Inner content background */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '12px',
          background: 'var(--bg-primary)',
        }}
      >
        {children}
      </div>
    </Tag>
  );
}
