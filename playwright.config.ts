import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Personal Portfolio
 *
 * Configured to use Chromium browser exclusively as specified in CLAUDE.md
 * Includes accessibility testing with @axe-core/playwright integration
 */
export default defineConfig({
  // Test directory
  testDir: './tests',

  // Fail the build on CI if tests contain focus annotations
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Parallel test execution (adjust based on your CPU cores)
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  // Shared settings for all tests
  use: {
    // Base URL for tests (matches Vite dev server)
    baseURL: 'http://localhost:3001',

    // Collect trace on first retry for debugging
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',
  },

  // Project configuration - Chromium only (as per CLAUDE.md)
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium', // Explicitly use Chromium
      },
    },

    // Mobile Chromium viewport (for responsive testing)
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Pixel 5'],
        channel: 'chromium',
      },
    },

    // Tablet Chromium viewport
    {
      name: 'tablet-chromium',
      use: {
        ...devices['iPad Pro'],
        channel: 'chromium',
      },
    },
  ],

  // Web server configuration (auto-start Vite dev server)
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes
  },
});
