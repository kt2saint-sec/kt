import SectionWrapper from '@/components/shared/SectionWrapper';
import NeonSign from '@/components/ui/NeonSign';
import ProjectBillboard from '@/components/ui/ProjectBillboard';
import type { Project } from '@/types/project';
import projectsData from '@/data/projects.json';
import projectsBg from '@/assets/illustrations/billboard-district.webp';

export default function ProjectsSection() {
  const projects = projectsData.projects as Project[];
  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects" bgImage={projectsBg} overlayOpacity={0.65}>
      <div className="max-w-6xl mx-auto">
        <NeonSign text="Projects" color="magenta" size="xl" as="h2" className="mb-12 text-center" />

        {/* Featured projects — larger cards */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-sm uppercase tracking-widest text-neon-gold mb-6">
              Featured
            </h3>
            <div className="grid md:grid-cols-1 gap-6">
              {featured.map((project, i) => (
                <ProjectBillboard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Regular projects — grid */}
        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-text-muted mb-6">
            All Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((project, i) => (
              <ProjectBillboard key={project.id} project={project} index={i + featured.length} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
