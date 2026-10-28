'use client';

import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  openInNewTab?: boolean;
  /** Не влияет на внешний вид после редизайна; оставлен для совместимости. */
  variant?: 'light' | 'dark';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function GlassButton({
  children,
  onClick,
  href,
  openInNewTab = false,
  className = '',
  fullWidth = false,
  disabled = false,
}: GlassButtonProps) {
  const padding = '24px 32px';

  const content = (
    <>
      <span className="rd-glass-button-clip" aria-hidden>
        <span className="rd-glass-button-fill" />
      </span>
      <span className="rd-glass-button-label">{children}</span>
    </>
  );

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    padding: padding,
    backgroundColor: 'var(--rd-button)',
    borderRadius: '48px',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '1.4em',
    letterSpacing: '-0.06em',
    textTransform: 'uppercase',
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    zIndex: 1,
    pointerEvents: disabled ? 'none' : 'auto',
    opacity: disabled ? 0.6 : 1,
  };

  const buttonClassName = `rd-glass-button ${className}`.trim();

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={buttonClassName}
        style={buttonStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={buttonClassName}
      style={buttonStyle}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
