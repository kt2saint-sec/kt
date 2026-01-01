# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2026-01-01

### Added
- **Skip to Main Content Link**: Industry-standard accessibility feature
  - Visually hidden but keyboard-focusable (sr-only with focus styles)
  - Allows keyboard users to bypass navigation and jump directly to content
  - Implements WCAG 2.1 best practice for keyboard navigation

### Changed
- **Social Media Icons**: Added descriptive ARIA labels for screen readers
  - Instagram: "Visit Instagram profile"
  - X (Twitter): "Visit X (Twitter) profile"
  - Facebook: "Visit Facebook profile"
  - GitHub: "Visit GitHub profile"
- **Mobile Menu Button**: Enhanced with dynamic ARIA attributes
  - `aria-label` changes based on menu state (open/close)
  - `aria-expanded` indicates menu expansion state
- **Badge Color Scheme**: Updated from bright accents to professional slate monochromatic palette
  - Increased background opacity from 10% to 25-30% for better visibility
  - Improved contrast ratio from 4.17:1 to 6.2:1 (exceeds WCAG AA 4.5:1 requirement)
  - Applied uniformly across 27 badge elements in TechBadge, ProjectCard, and AdminDashboard components

### Fixed
- **Accessibility Compliance**: Achieved full WCAG 2.1 AA compliance
  - Fixed link-name violations (8 instances across all viewports)
  - Fixed ARIA label configuration errors
  - Fixed keyboard navigation focus issues on desktop/tablet viewports
  - All 15 accessibility tests now passing
- **Color Contrast**: All text elements now meet WCAG AA standards (≥4.5:1 ratio)
- **E2E Test Suite**: Updated internal links test to exclude accessibility-only skip link
  - All 39 tests passing (15 accessibility + 24 e2e)

### Technical
- Files modified: `src/App.tsx`, `src/components/TechBadge.tsx`, `src/components/ProjectCard.tsx`, `src/components/AdminDashboard.tsx`, `tests/e2e/portfolio-navigation.spec.ts`
- Production build verified (171.30 kB JS, 104.21 kB CSS)
- Zero console errors or network errors on page load

## [1.1.0] - 2025-12-31

### Added
- **Projects Section**: New portfolio showcase featuring 4 curated projects
  - FuturePrintAI.com (featured project, in closed beta)
  - PERT Calibration System
  - Redis Performance Optimization
  - System Security Hardening
- **Modular Component Architecture**:
  - `ProjectCard` component with glass morphism effects and hover animations
  - `TechBadge` component with color-coded technology tags
  - `ProjectsSection` container with responsive grid layout
- **External Data Management**: JSON-based project data (`src/data/projects.json`)
- **TypeScript Type Safety**: Project interfaces in `src/types/project.ts`
- **Project Assets**:
  - FuturePrint product demo video (2.7MB, optimized)
  - FuturePrint logo (59KB)
  - Redis logo SVG (1.7KB)
  - GitHub logo SVG (1.9KB)
- **Navigation Integration**: Projects button added to main navigation menu
- **Responsive Design**:
  - Mobile (< 768px): Single-column stacked layout
  - Tablet (≥ 768px): 2-column grid
  - Desktop (≥ 1024px): 3-column grid
  - Featured projects span full width at all breakpoints

### Changed
- **Tailwind CSS Configuration**: Added PostCSS plugin for proper compilation
- **Global Styles**: Updated with Tailwind imports and glass morphism utilities

### Fixed
- Tailwind CSS compilation issues with v4.0.0
- PostCSS configuration for Vite integration

## [1.0.0] - 2025-12-27

### Added
- Initial portfolio website with static professional information
- Hero section with roles: Developer, System Architect, Sales Professional, Sales Trainer
- Experience section showcasing work history
- Certifications section
- Payments section
- Contact section
- Security updates: Vite 6.4.1 (CVE-2025-30208 fix)

### Security
- Updated Vite to 6.4.1 to address CVE-2025-30208

---

## Version History

- **1.1.1** (2026-01-01): Accessibility compliance (WCAG 2.1 AA) and color scheme improvements
- **1.1.0** (2025-12-31): Projects section with modern card-based UI
- **1.0.0** (2025-12-27): Initial portfolio website release
