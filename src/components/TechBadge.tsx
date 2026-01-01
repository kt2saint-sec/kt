interface TechBadgeProps {
  tech: string;
}

const techColors: Record<string, string> = {
  'React': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Next.js': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'TypeScript': 'bg-blue-600/10 text-blue-500 border-blue-600/20',
  'Python': 'bg-green-500/10 text-green-400 border-green-500/20',
  'FastAPI': 'bg-green-600/10 text-green-500 border-green-600/20',
  'Docker': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Redis': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Linux': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'SSH': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'UFW': 'bg-orange-600/10 text-orange-500 border-orange-600/20',
  'AI/ML': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Cloud Infrastructure': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Statistics': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'CLI Tools': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'JSONL': 'bg-gray-600/10 text-gray-500 border-gray-600/20',
  'Bash': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'Performance Tuning': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Security': 'bg-red-600/10 text-red-500 border-red-600/20',
};

export function TechBadge({ tech }: TechBadgeProps) {
  const colorClass = techColors[tech] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

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
