import { cn } from './utils';

interface NeonSignProps {
  text: string;
  color?: 'cyan' | 'magenta' | 'orange' | 'gold' | 'red';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  flicker?: boolean;
  pulse?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  className?: string;
}

const colorMap = {
  cyan: 'text-neon-cyan neon-text',
  magenta: 'text-neon-magenta neon-text-magenta',
  orange: 'text-neon-orange neon-text-orange',
  gold: 'text-neon-gold',
  red: 'text-neon-red',
};

const sizeMap = {
  sm: 'text-lg md:text-xl',
  md: 'text-2xl md:text-3xl',
  lg: 'text-3xl md:text-4xl',
  xl: 'text-4xl md:text-5xl',
  hero: 'text-5xl md:text-7xl lg:text-8xl',
};

export default function NeonSign({
  text,
  color = 'cyan',
  size = 'lg',
  flicker = false,
  pulse = false,
  as: Tag = 'h2',
  className,
}: NeonSignProps) {
  return (
    <Tag
      className={cn(
        'uppercase tracking-wider hero-name-font',
        colorMap[color],
        sizeMap[size],
        flicker && 'animate-neon-flicker',
        pulse && 'animate-neon-pulse',
        className,
      )}
    >
      {text}
    </Tag>
  );
}
