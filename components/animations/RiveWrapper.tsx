'use client';

import { useRive, UseRiveParameters } from '@rive-app/react-canvas';

interface RiveWrapperProps {
  src: string;
  stateMachines?: string;
  autoplay?: boolean;
  className?: string;
}

export default function RiveWrapper({
  src,
  stateMachines = 'State Machine 1',
  autoplay = true,
  className = 'w-full h-full',
}: RiveWrapperProps) {
  const { RiveComponent } = useRive({
    src,
    stateMachines,
    autoplay,
  });

  return (
    <div className={className}>
      <RiveComponent />
    </div>
  );
}

