# Personal Portfolio - Claude Code Instructions

## ⚠️ PROJECT IDENTIFICATION

**THIS IS:** Karl Toussaint's Personal Portfolio Website
**THIS IS NOT:** FuturePrint (DTF printing software)

**Project Details:**
- **Owner:** Karl Toussaint
- **Purpose:** Personal portfolio showcasing cybersecurity, AI automation, web development work
- **Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS 4 + Radix UI
- **Dev Server:** http://localhost:3001
- **Location:** `/home/rebelsts/personalwebsite/`

**Port Configuration:**
- Portfolio (this project): Port 3001
- FuturePrint (separate): Port 3000
- **Reason for port 3001:** Avoid conflict with FuturePrint server

---

## 🚫 CRITICAL: DO NOT ACCESS FUTUREPRINT DIRECTORIES

**UNDER NO CIRCUMSTANCES should you access, alter, or change anything in:**

- `~/FuturePrintDTF/` (or any subdirectory)
- `~/websites/futureprintdtf/` (or any subdirectory)
- `/home/rebelsts/FuturePrintDTF/` (absolute path)
- `/home/rebelsts/websites/futureprintdtf/` (absolute path)

**These are completely separate projects with ZERO relation to this portfolio.**

**If you need to work on FuturePrint, that must be done in a separate Claude session in those directories.**

---

## Browser Configuration

**Default Browser:** Chromium

All development, testing, and browser automation in this project should use **Chromium** as the primary browser.

### Development Server
- **URL:** http://localhost:3001
- **Vite auto-opens:** Chromium should be used when `npm run dev` triggers browser opening
- **Allowed hosts:** localhost, 0.0.0.0, host.docker.internal (configured in vite.config.ts:65)
- **Note:** Port 3001 is used to avoid conflict with FuturePrint Next.js server running on port 3000

### Browser Automation (Configured ✅)
Playwright is configured with Chromium browser:
- Configuration file: `playwright.config.ts`
- Browser channel: `chromium` (desktop, mobile, tablet viewports)
- Chromium installed: `npx playwright install chromium`
- axe-core integration: `@axe-core/playwright` for accessibility testing

### Testing & Development
- **Manual testing:** Use Chromium browser
- **DevTools:** Chromium DevTools for debugging
- **Accessibility:** Chromium accessibility tools + axe DevTools extension
- **Responsive testing:** Chromium device emulation + Playwright viewports
- **E2E Testing:** Playwright with Chromium (see Test Commands below)

## Project Tech Stack
- React 18.3.1 + TypeScript 5.6.3
- Vite 6.4.1 (dev server + build tool)
- Radix UI (accessible component primitives)
- Tailwind CSS 4.0.0

## Development Workflow
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev` (opens Chromium at port 3001)
3. Build production: `npm run build`
4. Preview build: `npm run preview`

## Test Commands

### Run All Tests
```bash
npm test                 # Run all tests (headless Chromium)
npm run test:ui          # Interactive UI mode
npm run test:headed      # Run with visible browser
npm run test:debug       # Debug mode with Playwright Inspector
```

### Run Specific Test Suites
```bash
npm run test:a11y        # Accessibility tests only (axe-core)
npm run test:e2e         # End-to-end tests only
npm run test:chromium    # Chromium project only (all tests)
```

### View Test Reports
```bash
npm run test:report      # Open HTML test report
```

## Accessibility Testing

### Automated Testing (Playwright + axe-core)
- Located in: `tests/accessibility/`
- Uses `@axe-core/playwright` for WCAG 2.1 AA compliance
- Tests: color contrast, heading hierarchy, ARIA labels, keyboard navigation
- Run: `npm run test:a11y`

### Manual Testing (Browser Extensions)
Installed Chromium extensions for manual testing:
- **axe DevTools** - Real-time accessibility scanning (F12 → axe DevTools tab)
- **React Developer Tools** - Component inspection
- **Tailwind CSS DevTools** - Styling inspection
- **Wappalyzer** - Technology detection

### Current Accessibility Issues
⚠️ **Color Contrast Violation:**
- Button with `background: #4ca3e5` and `color: #ffffff`
- Current contrast ratio: 2.73:1 (needs 4.5:1 for WCAG AA)
- Location: `.bg-[var(--brand-primary)]` class
- Fix: Darken background to `#2583c7` or similar

⚠️ **Heading Hierarchy:**
- Check proper h1 → h2 → h3 nesting
- Avoid skipping heading levels

⚠️ **Page Title:**
- Current: "FuturePrint Software for Epson Printers"
- Expected: Portfolio-specific title (e.g., "Karl Toussaint | Portfolio")

## Test Structure
```
tests/
├── fixtures/
│   └── axe-fixture.ts          # axe-core Playwright integration
├── accessibility/
│   └── homepage-a11y.spec.ts   # WCAG 2.1 AA accessibility tests
└── e2e/
    └── portfolio-navigation.spec.ts  # Component and navigation tests
```

## Notes
- This is a personal portfolio website (accessibility and cross-browser compatibility critical)
- Radix UI components are accessibility-focused but require proper color contrast
- See README.md for additional setup instructions
- Vite config: vite.config.ts (server settings, aliases, build configuration)
- Playwright config: playwright.config.ts (test configuration, Chromium setup)
