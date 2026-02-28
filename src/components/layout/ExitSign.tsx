import { Link } from 'react-router-dom';
import { cn } from '@/components/ui/utils';

interface ExitSignProps {
  to?: string;
  label?: string;
  className?: string;
}

/**
 * Red "EXIT" sign — neon-styled back navigation.
 * Used on project detail pages to return to home.
 */
export default function ExitSign({ to = '/#projects', label = 'Exit', className }: ExitSignProps) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-2 font-display text-lg uppercase tracking-widest',
        'text-neon-red px-4 py-2 border border-neon-red/40 rounded',
        'hover:bg-neon-red/10 hover:shadow-[0_0_15px_rgba(255,45,45,0.3)]',
        'transition-all duration-300',
        className,
      )}
      aria-label="Go back to projects"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  );
}
