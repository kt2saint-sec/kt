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
      {/* Living city effects — billboard district */}
      <div className="city-fx-layer" aria-hidden="true">
        <div className="projects-billboard-glow" style={{ top: '5%', left: '5%', width: '120px', height: '60px' }} />
        <div className="projects-billboard-glow" style={{ top: '8%', right: '10%', width: '100px', height: '50px', animationDelay: '3s' }} />
        <div className="projects-billboard-glow" style={{ top: '15%', left: '40%', width: '80px', height: '40px', animationDelay: '5s' }} />
        {/* Distant twinkling lights */}
        <div className="projects-twinkle" style={{ top: '6%', left: '15%', animationDelay: '0s' }} />
        <div className="projects-twinkle" style={{ top: '3%', left: '30%', animationDelay: '1.2s' }} />
        <div className="projects-twinkle" style={{ top: '10%', right: '20%', animationDelay: '0.6s' }} />
        <div className="projects-twinkle" style={{ top: '4%', right: '35%', animationDelay: '2.1s' }} />
        <div className="projects-twinkle" style={{ top: '8%', left: '55%', animationDelay: '1.8s' }} />
        <div className="projects-twinkle" style={{ top: '2%', right: '50%', animationDelay: '0.3s' }} />
      </div>

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
