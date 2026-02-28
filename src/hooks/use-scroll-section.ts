import { useEffect, useState, useCallback } from 'react';

const SECTIONS = ['home', 'about', 'projects', 'services', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];

/**
 * Tracks which section is currently in view for nav highlighting.
 * Works with horizontal scroll-snap layout.
 */
export function useScrollSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const container = document.getElementById('horizontal-scroll-container');
    if (!container) return;

    // Track visibility ratios and pick the most visible section
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        // Find the section with the highest visibility
        let best: SectionId = 'home';
        let bestRatio = 0;
        for (const id of SECTIONS) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (bestRatio > 0) {
          setActiveSection(best);
        }
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }, []);

  return { activeSection, scrollTo, sections: SECTIONS };
}
