import React, { useRef } from 'react';
import { Button } from '../ui/Button.tsx';
import { gsap } from '../../lib/gsap.ts';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export function MagneticButton({ children, variant, size, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  const onMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !ref.current) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    gsap.to(ref.current, {
      x: x * 0.16,
      y: y * 0.16,
      duration: 0.35,
      ease: 'power3.out'
    });
  };

  const onLeave = () => {
    if (!ref.current) {
      return;
    }

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: 'power3.out'
    });
  };

  return (
    <Button
      ref={ref as never}
      variant={variant}
      size={size}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="ENTER"
      {...rest}
    >
      {children}
    </Button>
  );
}
