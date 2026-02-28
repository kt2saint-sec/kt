import { useRef, useEffect } from 'react';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ServicesSection from '@/sections/ServicesSection';
import ContactSection from '@/sections/ContactSection';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Convert vertical wheel scroll to horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      // Only hijack if scrolling vertically (deltaY)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY, behavior: 'auto' });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      id="horizontal-scroll-container"
      className="flex overflow-x-auto overflow-y-hidden h-screen snap-x snap-mandatory scroll-smooth"
      style={{ scrollbarWidth: 'none' }}
    >
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
