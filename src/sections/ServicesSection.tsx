import SectionWrapper from '@/components/shared/SectionWrapper';
import NeonSign from '@/components/ui/NeonSign';
import NeonCard from '@/components/ui/NeonCard';
import servicesBg from '@/assets/illustrations/neon-market.webp';

const SERVICES = [
  {
    title: 'Cybersecurity Consulting',
    description: 'System hardening, vulnerability assessments, SSH/firewall configuration, and security audits for Linux environments.',
    icon: '🛡️',
    color: 'cyan' as const,
  },
  {
    title: 'AI Automation',
    description: 'Custom AI workflows, intelligent automation pipelines, and ML model integration for business process optimization.',
    icon: '🤖',
    color: 'magenta' as const,
  },
  {
    title: 'Web Development',
    description: 'Full-stack web applications with React, TypeScript, FastAPI — modern, performant, and accessible.',
    icon: '💻',
    color: 'purple' as const,
  },
  {
    title: 'Graphic Design',
    description: 'Brand identity, digital art, and visual design with a cyberpunk neon aesthetic. AI-assisted illustration workflows.',
    icon: '🎨',
    color: 'cyan' as const,
  },
];

export default function ServicesSection() {
  return (
    <SectionWrapper id="services" bgImage={servicesBg} overlayOpacity={0.7}>
      <div className="max-w-6xl mx-auto">
        <NeonSign text="Services" color="orange" size="xl" as="h2" className="mb-12 text-center" />

        <div className="grid sm:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <NeonCard
              key={service.title}
              glowColor={service.color}
              className="group"
            >
              {/* Storefront sign header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">{service.icon}</span>
                <h3 className="font-display text-xl uppercase tracking-wider text-text-white group-hover:text-neon-cyan transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              <p className="text-text-muted leading-relaxed">
                {service.description}
              </p>
            </NeonCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
