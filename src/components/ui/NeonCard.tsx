import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from './utils';

interface NeonCardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: 'cyan' | 'magenta' | 'purple';
  hover?: boolean;
}

const glowMap = {
  cyan: {
    border: 'border-neon-cyan/30',
    shadow: 'shadow-[0_0_15px_rgba(0,229,255,0.1)]',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] hover:border-neon-cyan/50',
  },
  magenta: {
    border: 'border-neon-magenta/30',
    shadow: 'shadow-[0_0_15px_rgba(255,0,153,0.1)]',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(255,0,153,0.2)] hover:border-neon-magenta/50',
  },
  purple: {
    border: 'border-neon-purple/30',
    shadow: 'shadow-[0_0_15px_rgba(123,47,255,0.1)]',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(123,47,255,0.2)] hover:border-neon-purple/50',
  },
};

const NeonCard = forwardRef<HTMLDivElement, NeonCardProps>(
  ({ className, glowColor = 'cyan', hover = true, children, ...props }, ref) => {
    const glow = glowMap[glowColor];

    return (
      <div
        ref={ref}
        className={cn(
          'border backdrop-blur-[10px] bg-bg-dark/70 rounded-lg p-6 transition-all duration-300',
          glow.border,
          glow.shadow,
          hover && glow.hoverShadow,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

NeonCard.displayName = 'NeonCard';

export default NeonCard;
