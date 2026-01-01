import { ProjectCard } from './ProjectCard';
import projectsData from '../data/projects.json';
import type { ProjectsData } from '../types/project';

const data = projectsData as ProjectsData;

export function ProjectsSection() {
  // Separate featured and regular projects
  const featuredProjects = data.projects.filter(p => p.featured);
  const regularProjects = data.projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-12 md:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in development, optimization, and system architecture.
          </p>
        </div>

        {/* Featured Projects - Full Width */}
        {featuredProjects.length > 0 && (
          <div className="mb-8 grid gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Regular Projects - Grid Layout */}
        {regularProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Empty State (if no projects) */}
        {data.projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
