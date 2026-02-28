import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/components/ui/utils';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Background illustration image URL */
  bgImage?: string;
  /** Additional background overlay darkness (0-1) */
  overlayOpacity?: number;
}

/**
 * Wraps each city section as a horizontal panel:
 * - Full viewport width + snap alignment for comic book navigation
 * - Internal vertical scroll for tall content
 * - Optional background illustration with dark overlay
 * - Page turn shadow on left edge
 */
export default function SectionWrapper({
  id,
  children,
  className,
  bgImage,
  overlayOpacity = 0.5,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const container = document.getElementById('horizontal-scroll-container');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { root: container, threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      tabIndex={0}
      className={cn(
        'relative w-screen h-screen flex-shrink-0 snap-start overflow-y-auto overscroll-y-contain',
        'py-20 px-4 md:px-8 lg:px-16',
        !isVisible && 'opacity-0',
        isVisible && 'animate-slide-up',
        className,
      )}
    >
      {/* Page turn shadow on left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Background image layer */}
      {bgImage && (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-bg-dark"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {children}
    </section>
  );
}
