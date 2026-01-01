# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

- **1.1.0** (2025-12-31): Projects section with modern card-based UI
- **1.0.0** (2025-12-27): Initial portfolio website release
