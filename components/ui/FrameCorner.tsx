type FrameCornerProps = {
  position?: 'top' | 'bottom';
  className?: string;
};

export default function FrameCorner({ position = 'top', className = '' }: FrameCornerProps) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="#000000"
      aria-hidden="true"
      className={className}
      style={position === 'bottom' ? { transform: 'scaleY(-1)' } : undefined}
    >
      <rect x="0" y="0" width="12" height="12" />
      <rect x="18" y="0" width="32" height="1" />
      <rect x="0" y="18" width="1" height="32" />
    </svg>
  );
}
