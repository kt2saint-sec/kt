import NeonButton from '@/components/ui/NeonButton';
import FloatingParticles from '@/components/ui/FloatingParticles';

import heroBg from '@/assets/illustrations/hero-karl-skyscraper.webp';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-screen overflow-hidden flex-shrink-0 snap-start"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-city-reveal"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 via-bg-dark/30 to-bg-dark/80" />
      </div>

      <FloatingParticles count={25} />

      {/* Name + subtitle block — left-aligned together */}
      <div className="absolute z-20 left-[8%] md:left-[12%] lg:left-[15%] top-[18%] md:top-[16%] animate-neon-sign-on">
        <h1
          className="uppercase tracking-wider text-4xl md:text-6xl lg:text-[4.5rem] hero-name leading-none"
        >
          Karl Toussaint
        </h1>
        <p
          className="hero-name uppercase tracking-[0.15em] text-lg md:text-xl lg:text-2xl mt-2 text-right animate-slide-up"
          style={{ animationDelay: '1.8s', opacity: 0 }}
        >
          Web &amp; Software Development
        </p>
      </div>

      {/* Description + CTAs — pinned to bottom of hero */}
      <div className="absolute z-10 bottom-20 left-[8%] md:left-[12%] lg:left-[15%] right-4 md:right-auto max-w-xl">
        <p className="text-text-white font-bold text-lg md:text-xl mb-6 animate-slide-up" style={{ animationDelay: '2.1s', opacity: 0 }}>
          Building secure software, AI Automation, Web Development &amp; SaaS, &amp; creating digital art.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-4 animate-slide-up" style={{ animationDelay: '2.4s', opacity: 0 }}>
          <NeonButton onClick={() => scrollToSection('about')} variant="cyan" size="lg">
            About Me
          </NeonButton>
          <NeonButton onClick={() => scrollToSection('projects')} variant="magenta" size="lg">
            View Projects
          </NeonButton>
        </div>
      </div>

      {/* Horizontal scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-gentle-float" aria-hidden="true">
        <div className="w-10 h-6 rounded-full border-2 border-neon-cyan/40 flex items-center justify-start p-1">
          <div className="w-3 h-1.5 rounded-full bg-neon-cyan/60 animate-[slide-right-hint_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
