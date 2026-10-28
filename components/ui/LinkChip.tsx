import { forwardRef, type AnchorHTMLAttributes } from 'react';

const Bracket = ({ side }: { side: 'left' | 'right' }) => (
  <svg
    width="4"
    height="15"
    viewBox="0 0 4 15"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    style={side === 'right' ? { transform: 'scaleX(-1)' } : undefined}
  >
    <path d="M4 0.5H0.5V14.5H4" />
  </svg>
);

const Arrow = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M0.4 5.6L5.4 0.6M1.4 0.6H5.4V4.6" />
  </svg>
);

const LinkChip = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function LinkChip({ className = '', children, ...rest }, ref) {
    return (
      <a ref={ref} className={`rd-link-chip ${className}`} {...rest}>
        <Bracket side="left" />
        <span>{children}</span>
        <Arrow />
        <Bracket side="right" />
      </a>
    );
  },
);

export default LinkChip;
