import type { HTMLAttributes } from 'react';

export default function Badge({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rd-badge ${className}`} {...rest}>
      {children}
    </div>
  );
}
