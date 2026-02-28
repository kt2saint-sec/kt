import { useParams } from 'react-router-dom';
import type { Project } from '@/types/project';
import projectsData from '@/data/projects.json';
import ExitSign from '@/components/layout/ExitSign';
import NeonSign from '@/components/ui/NeonSign';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import NotFoundPage from './NotFoundPage';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = (projectsData.projects as Project[]).find((p) => p.id === id);

  if (!project) return <NotFoundPage />;

  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Exit sign */}
        <ExitSign className="mb-8" />

        {/* Project header */}
        <div className="mb-8">
          <span className="inline-block text-xs font-display uppercase tracking-widest px-3 py-1 rounded-full border border-neon-gold/30 text-neon-gold mb-4">
            {project.status}
          </span>
          <NeonSign text={project.title} color="cyan" size="xl" as="h1" className="mb-2" />
          <p className="text-text-muted font-mono text-sm">{project.period}</p>
        </div>

        {/* Project content */}
        <NeonCard className="mb-8">
          <p className="text-text-white text-lg leading-relaxed">
            {project.description}
          </p>
        </NeonCard>

        {/* Tech stack */}
        <NeonCard glowColor="purple" className="mb-8">
          <h2 className="font-display text-sm uppercase tracking-widest text-text-muted mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg border border-neon-purple/30 text-neon-purple font-display uppercase tracking-wider text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </NeonCard>

        {/* Links */}
        {project.links && (
          <div className="flex flex-wrap gap-4">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                <NeonButton variant="cyan">Visit Live Site</NeonButton>
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <NeonButton variant="magenta">View on GitHub</NeonButton>
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <NeonButton variant="orange">Watch Demo</NeonButton>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
