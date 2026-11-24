import { useRef, useState, type ElementType, type MouseEvent, type ReactNode } from 'react';

interface SpotlightCardProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  spotlightColor?: string;
}

/**
 * Contenedor con efecto Spotlight / Glow radial que sigue el movimiento del cursor,
 * iluminando sutilmente tanto la superficie interior como el borde.
 */
export const SpotlightCard = ({
  as: Component = 'div',
  className = '',
  children,
  spotlightColor = 'rgba(255, 107, 0, 0.13)',
}: SpotlightCardProps) => {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-colors duration-300 hover:border-orange-500/40 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      {children}
    </Component>
  );
};