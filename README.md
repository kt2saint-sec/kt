
  # Karl Toussaint - Personal Portfolio Website

  **Project Owner:** Karl Toussaint
  **Purpose:** Personal portfolio showcasing cybersecurity, AI automation, and web development expertise
  **Tech Stack:** React 18.3.1 + TypeScript 5.6.3 + Vite 6.4.1 + Tailwind CSS 4.0.0 + Radix UI

  ⚠️ **This is NOT FuturePrint** - This is a personal portfolio website. FuturePrint (DTF printing software) is a separate project located at `/home/rebelsts/FuturePrint/`

  ## Design

  The original Figma design is available at https://www.figma.com/design/qRmABFPSqWppr0gWcPJSTx/My-Personal-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server on **port 3001** (http://localhost:3001)

  **Note:** This project uses port 3001 to avoid conflicts with FuturePrint running on port 3000.

  ## Testing

  This project includes Playwright tests for accessibility (WCAG 2.1 AA) and end-to-end functionality:

  ```bash
  npm test              # Run all tests
  npm run test:a11y     # Accessibility tests only
  npm run test:e2e      # E2E tests only
  npm run test:ui       # Interactive test UI
  npm run test:report   # View HTML test report
  ```

  ## Project Structure

  - **React Components:** `/src/components/`
  - **Pages:** `/src/pages/`
  - **Tests:** `/tests/`
  - **Configuration:** `vite.config.ts`, `playwright.config.ts`, `CLAUDE.md`
  