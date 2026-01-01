import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types/project';
import { TechBadge } from './TechBadge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    period,
    description,
    techStack,
    image,
    video,
    logo,
    links,
    featured,
    status,
  } = project;

  // Status badge colors
  const statusColors = {
    'Completed': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
    'In Progress': 'bg-slate-700/30 text-slate-300 border-slate-500/30',
    'In Closed Beta': 'bg-slate-800/25 text-slate-300 border-slate-600/30',
    'Archived': 'bg-slate-700/20 text-slate-400 border-slate-600/25',
  };

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl
        bg-white/5 backdrop-blur-sm
        border border-white/10
        transition-all duration-300
        hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10
        ${featured ? 'md:col-span-2 lg:col-span-3' : ''}
      `}
    >
      {/* Image/Video Section */}
      {video ? (
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-transparent opacity-60" />
        </div>
      ) : image ? (
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <img
            src={`/src/assets/images/projects/${image}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-transparent opacity-60" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <div className="text-white/40 text-4xl font-bold">{title.charAt(0)}</div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className={`font-semibold text-white ${featured ? 'text-2xl' : 'text-xl'}`}>
              {title}
            </h3>
            <span
              className={`
                inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                border backdrop-blur-sm shrink-0
                ${statusColors[status]}
              `}
            >
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-400">{period}</p>
        </div>

        {/* Description */}
        <p className={`text-gray-300 ${featured ? 'text-base' : 'text-sm'}`}>
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        {/* Links */}
        {links && (Object.keys(links).length > 0) && (
          <div className={`flex ${logo ? 'justify-between items-center' : 'gap-3'} pt-2`}>
            {/* Logo (if present) */}
            {logo && (
              <img
                src={logo}
                alt=""
                className="h-8 object-contain"
              />
            )}

            {/* Links container */}
            <div className="flex gap-3">
              {links.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    bg-slate-800/25 text-slate-300 border border-slate-600/30
                    hover:bg-slate-800/35 hover:border-slate-600/45
                    transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Site
                </a>
              )}
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    bg-slate-800/20 text-slate-300 border border-slate-600/25
                    hover:bg-slate-800/30 hover:border-slate-600/35
                    transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  Source
                </a>
              )}
              {links.demo && (
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    bg-slate-800/25 text-slate-300 border border-slate-600/30
                    hover:bg-slate-800/35 hover:border-slate-600/45
                    transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Featured Badge (if featured) */}
      {featured && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
            bg-slate-700/30 text-slate-300 border border-slate-500/35 backdrop-blur-sm">
            Featured
          </span>
        </div>
      )}
    </div>
  );
}
