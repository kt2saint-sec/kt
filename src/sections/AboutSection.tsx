import SectionWrapper from '@/components/shared/SectionWrapper';
import NeonSign from '@/components/ui/NeonSign';
import NeonCard from '@/components/ui/NeonCard';
import aboutBg from '@/assets/illustrations/street-block-about.webp';

const SKILLS = [
  { name: 'AI Agent Building', color: 'cyan' as const },
  { name: 'MCP Servers', color: 'cyan' as const },
  { name: 'n8n Automation', color: 'magenta' as const },
  { name: 'Cybersecurity', color: 'magenta' as const },
  { name: 'Cloudflare / Supabase', color: 'purple' as const },
  { name: 'PostgreSQL', color: 'purple' as const },
  { name: 'Project Architecture', color: 'cyan' as const },
  { name: 'AI-Assisted Development', color: 'magenta' as const },
  { name: 'System Hardening', color: 'purple' as const },
  { name: 'Digital Art / Design', color: 'cyan' as const },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" bgImage={aboutBg} overlayOpacity={0.7}>
      {/* Living city effects — street level */}
      <div className="city-fx-layer" aria-hidden="true">
        <div className="about-steam about-steam--1" />
        <div className="about-steam about-steam--2" />
        <div className="about-steam about-steam--3" />
        <div className="about-steam about-steam--4" />
        <div className="about-reflection" />
        <div className="about-ember about-ember--1" />
        <div className="about-ember about-ember--2" />
        <div className="about-ember about-ember--3" />
      </div>

      <div className="max-w-6xl mx-auto">
        <NeonSign text="About Me" color="cyan" size="xl" as="h2" className="mb-12 text-center" />

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Story column */}
          <div>
            <NeonCard>
              <p className="text-text-white leading-relaxed text-lg mb-4">
                I'm Karl Toussaint — a cybersecurity professional, AI automation builder,
                and creative technologist based in Orlando, FL. With over two decades of
                experience across sales, systems, and security, I bring a unique blend of
                business acumen and deep technical expertise.
              </p>
              <p className="text-text-muted leading-relaxed">
                From building AI-powered printing platforms to hardening Linux servers,
                I focus on creating systems that work autonomously and securely.
                Currently developing FuturePrintAI — an AI-driven design and printing
                platform for creative professionals.
              </p>
            </NeonCard>
          </div>

          {/* Skills column */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-widest text-text-muted mb-6">
              Skills &amp; Technologies
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className={`
                    neon-card p-3 text-center font-display uppercase tracking-wider text-sm
                    ${skill.color === 'cyan' ? 'text-neon-cyan border-neon-cyan/30' : ''}
                    ${skill.color === 'magenta' ? 'text-neon-magenta border-neon-magenta/30' : ''}
                    ${skill.color === 'purple' ? 'text-neon-purple border-neon-purple/30' : ''}
                  `}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-12">
          <NeonCard className="max-w-lg mx-auto text-center">
            <h3 className="font-display text-sm uppercase tracking-widest text-text-muted mb-2">Education</h3>
            <p className="text-text-white font-display text-lg uppercase tracking-wider">
              Associate in Business Administration
            </p>
            <p className="text-neon-cyan text-sm">Valencia College &middot; 2006–2009</p>
          </NeonCard>
        </div>
      </div>
    </SectionWrapper>
  );
}
