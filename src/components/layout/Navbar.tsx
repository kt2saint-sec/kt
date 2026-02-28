import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollSection, type SectionId } from '@/hooks/use-scroll-section';
import { cn } from '@/components/ui/utils';
import ktLogo from '@/assets/kt-logo-nav.png';

const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const { activeSection, scrollTo } = useScrollSection();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: SectionId) => {
    setMobileOpen(false);
    if (isHome) {
      scrollTo(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-md border-b border-neon-cyan/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo / Name */}
        <Link
          to="/"
          className="hover:opacity-80 transition-opacity duration-300"
        >
          <img src={ktLogo} alt="KT logo" className="h-10 w-10" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNav(item.id)}
                className={cn(
                  'font-display text-sm uppercase tracking-widest transition-all duration-300 bg-transparent border-none cursor-pointer',
                  isHome && activeSection === item.id
                    ? 'text-neon-cyan neon-text'
                    : 'text-text-muted hover:text-neon-cyan',
                )}
                aria-current={isHome && activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={cn('w-6 h-0.5 bg-neon-cyan transition-all duration-300', mobileOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('w-6 h-0.5 bg-neon-cyan transition-all duration-300', mobileOpen && 'opacity-0')} />
          <span className={cn('w-6 h-0.5 bg-neon-cyan transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-dark/95 backdrop-blur-md border-t border-neon-cyan/10">
          <ul className="flex flex-col p-4 gap-2" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    'w-full text-left font-display text-lg uppercase tracking-widest p-3 rounded-lg transition-all duration-300 bg-transparent border-none cursor-pointer',
                    isHome && activeSection === item.id
                      ? 'text-neon-cyan bg-neon-cyan/5'
                      : 'text-text-muted hover:text-neon-cyan hover:bg-neon-cyan/5',
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
