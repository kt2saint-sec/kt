interface TechBadgeProps {
  tech: string;
}

const techColors: Record<string, string> = {
  'React': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Next.js': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'TypeScript': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Python': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'FastAPI': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Docker': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Redis': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Linux': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'SSH': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'UFW': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'AI/ML': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Cloud Infrastructure': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Statistics': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'CLI Tools': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'JSONL': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Bash': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Performance Tuning': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
  'Security': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
};

export function TechBadge({ tech }: TechBadgeProps) {
  const colorClass = techColors[tech] || 'bg-slate-800/25 text-slate-300 border-slate-600/30';

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        border backdrop-blur-sm transition-all duration-300
        hover:scale-105 hover:shadow-lg
        ${colorClass}
      `}
    >
      {tech}
    </span>
  );
}
