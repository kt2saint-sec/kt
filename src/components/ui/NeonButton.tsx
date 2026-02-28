import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from './utils';

type NeonVariant = 'cyan' | 'magenta' | 'orange';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeonVariant;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<NeonVariant, string> = {
  cyan: 'neon-btn',
  magenta: 'neon-btn neon-btn-magenta',
  orange: 'border-neon-orange text-neon-orange shadow-[0_0_10px_rgba(255,107,0,0.2)] hover:bg-neon-orange/10 hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'cyan', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        variantStyles[variant],
        sizeStyles[size],
        'inline-flex items-center justify-center gap-2 font-display uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

NeonButton.displayName = 'NeonButton';

export default NeonButton;
