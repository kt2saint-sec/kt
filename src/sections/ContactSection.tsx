import { type FormEvent, useState } from 'react';
import SectionWrapper from '@/components/shared/SectionWrapper';
import NeonSign from '@/components/ui/NeonSign';
import NeonButton from '@/components/ui/NeonButton';
import { NeonInput, NeonTextarea } from '@/components/ui/NeonInput';
import BearMascot from '@/components/ui/BearMascot';
import contactBg from '@/assets/illustrations/rooftop-contact.webp';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to form backend (Formspree, Netlify Forms, etc.)
    setSubmitted(true);
  };

  return (
    <SectionWrapper id="contact" bgImage={contactBg} overlayOpacity={0.65}>
      {/* Living city effects — rooftop view */}
      <div className="city-fx-layer" aria-hidden="true">
        {/* City lights twinkling below */}
        <div className="contact-city-light" style={{ bottom: '15%', left: '10%', background: 'rgba(0, 229, 255, 0.8)', '--dur': '2.5s', '--del': '0s' } as React.CSSProperties} />
        <div className="contact-city-light" style={{ bottom: '18%', left: '25%', background: 'rgba(255, 0, 153, 0.7)', '--dur': '3.2s', '--del': '0.8s' } as React.CSSProperties} />
        <div className="contact-city-light" style={{ bottom: '12%', left: '40%', background: 'rgba(255, 215, 0, 0.8)', '--dur': '2.8s', '--del': '1.5s' } as React.CSSProperties} />
        <div className="contact-city-light" style={{ bottom: '20%', left: '55%', background: 'rgba(0, 229, 255, 0.6)', '--dur': '3.5s', '--del': '0.3s' } as React.CSSProperties} />
        <div className="contact-city-light" style={{ bottom: '14%', left: '70%', background: 'rgba(255, 107, 0, 0.7)', '--dur': '2.2s', '--del': '2.1s' } as React.CSSProperties} />
        <div className="contact-city-light" style={{ bottom: '16%', left: '85%', background: 'rgba(255, 0, 153, 0.6)', '--dur': '3.8s', '--del': '1.2s' } as React.CSSProperties} />
        <div className="contact-city-light" style={{ bottom: '22%', left: '15%', background: 'rgba(255, 255, 255, 0.5)', '--dur': '4s', '--del': '0.5s' } as React.CSSProperties} />
        <div className="contact-city-light" style={{ bottom: '19%', left: '60%', background: 'rgba(123, 47, 255, 0.7)', '--dur': '2.9s', '--del': '1.8s' } as React.CSSProperties} />

        {/* Drifting cloud */}
        <div className="contact-cloud" />
        <div className="contact-cloud" style={{ top: '10%', animationDelay: '15s', width: '200px' }} />

        {/* Distant lightning */}
        <div className="contact-lightning" />
      </div>

      <div className="max-w-4xl mx-auto">
        <NeonSign text="Contact" color="cyan" size="xl" as="h2" className="mb-12 text-center" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="neon-card p-8 text-center">
                <NeonSign text="Message Sent" color="cyan" size="md" as="p" />
                <p className="text-text-muted mt-4">Thanks for reaching out! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <NeonInput
                  id="contact-name"
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
                <NeonInput
                  id="contact-email"
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
                <NeonTextarea
                  id="contact-message"
                  label="Message"
                  name="message"
                  placeholder="What can I help you with?"
                  required
                />
                <NeonButton type="submit" variant="cyan" size="lg" className="w-full">
                  Let's Build Something
                </NeonButton>
              </form>
            )}
          </div>

          {/* Contact info + bear */}
          <div className="space-y-6">
            <div className="neon-card p-6">
              <h3 className="font-display text-sm uppercase tracking-widest text-text-muted mb-4">
                Direct Contact
              </h3>
              <a
                href="mailto:kt2saint.create@gmail.com"
                className="text-neon-cyan hover:neon-text transition-all duration-300 block mb-2"
              >
                kt2saint.create@gmail.com
              </a>
              <p className="text-text-muted text-sm">Orlando, FL</p>
            </div>

            <div className="neon-card p-6">
              <h3 className="font-display text-sm uppercase tracking-widest text-text-muted mb-4">
                Social
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'GitHub', handle: 'kt2saint-sec', href: 'https://github.com/kt2saint-sec' },
                  { label: 'Instagram', handle: '@kt2saint.sec', href: 'https://instagram.com/kt2saint.sec' },
                  { label: 'TikTok', handle: '@KtCreates', href: 'https://tiktok.com/@KtCreates' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-neon-magenta transition-colors duration-300 text-sm"
                  >
                    <span className="text-neon-magenta/60">{social.label}:</span> {social.handle}
                  </a>
                ))}
              </div>
            </div>

            {/* Bear on rooftop */}
            <div className="flex justify-center">
              <BearMascot pose="sit" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
