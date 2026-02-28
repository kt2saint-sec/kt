import { Link } from 'react-router-dom';
import type { Project } from '@/types/project';
import { cn } from './utils';

interface ProjectBillboardProps {
  project: Project;
  index: number;
}

const accentColors = ['neon-cyan', 'neon-magenta', 'neon-orange', 'neon-purple', 'neon-gold'] as const;

export default function ProjectBillboard({ project, index }: ProjectBillboardProps) {
  const accent = accentColors[index % accentColors.length];

  return (
    <Link
      to={`/project/${project.id}`}
      className={cn(
        'group block neon-card p-6 transition-all duration-300',
        'hover:scale-[1.02] hover:animate-billboard-light',
      )}
      aria-label={`View ${project.title} project details`}
    >
      {/* Billboard header glow bar */}
      <div
        className={cn('h-1 w-full rounded-full mb-4', `bg-${accent}`)}
        style={{ boxShadow: `0 0 10px var(--${accent})` }}
      />

      {/* Status badge */}
      <span
        className={cn(
          'inline-block text-xs font-display uppercase tracking-widest px-3 py-1 rounded-full mb-3',
          'border border-current/30',
          project.status === 'In Closed Beta' && 'text-neon-gold',
          project.status === 'Completed' && 'text-neon-cyan',
          project.status === 'In Progress' && 'text-neon-orange',
        )}
      >
        {project.status}
      </span>

      {/* Title */}
      <h3 className={cn(
        'font-display text-xl md:text-2xl uppercase tracking-wider mb-2',
        'text-text-white group-hover:neon-text transition-all duration-300',
      )}>
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded border border-neon-purple/30 text-neon-purple/80 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Period */}
      <p className="text-text-muted/60 text-xs mt-4 font-mono">
        {project.period}
      </p>
    </Link>
  );
}
