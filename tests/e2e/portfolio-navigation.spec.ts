import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Portfolio Navigation and Interactions
 *
 * Tests basic user flows and React component interactions
 */

test.describe('Portfolio Navigation', () => {
  test('should load the homepage successfully', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify page title (adjust based on your actual title)
    await expect(page).toHaveTitle(/Karl|Portfolio/i);
  });

  test('should display main navigation elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for common portfolio sections (adjust selectors based on your actual components)
    const navigation = page.locator('nav').first();
    await expect(navigation).toBeVisible();
  });

  test('should handle responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify page renders on mobile
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should support dark mode toggle (if implemented)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for theme toggle button (common in portfolios)
    const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="dark"], button:has-text("Theme")').first();

    // If theme toggle exists, test it
    const toggleExists = await themeToggle.count();
    if (toggleExists > 0) {
      await themeToggle.click();
      // Verify theme change (adjust based on your implementation)
      const html = page.locator('html');
      const isDark = await html.evaluate((el) =>
        el.classList.contains('dark') || el.getAttribute('data-theme') === 'dark'
      );
      expect(isDark).toBeTruthy();
    }
  });

  test('should have working internal links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find first internal link (excluding skip link which is sr-only)
    const firstLink = page.locator('a[href^="/"], a[href^="#"]:not([href="#main-content"])').first();

    const linkExists = await firstLink.count();
    if (linkExists > 0) {
      const href = await firstLink.getAttribute('href');

      // If it's a hash link (same page), verify scroll behavior
      if (href?.startsWith('#')) {
        await firstLink.click();
        await page.waitForTimeout(500); // Wait for smooth scroll
        expect(page.url()).toContain(href);
      }
    }
  });
});

test.describe('Portfolio Components', () => {
  test('should render Radix UI components correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for Radix UI data attributes (they add data-radix-* attributes)
    const radixComponents = page.locator('[data-radix-collection-item], [data-state], [data-orientation]');
    const count = await radixComponents.count();

    // If Radix components exist, verify they're accessible
    if (count > 0) {
      const firstComponent = radixComponents.first();
      await expect(firstComponent).toBeVisible();
    }
  });

  test('should have no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = [];

    // Listen for console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify no errors
    expect(consoleErrors).toEqual([]);
  });

  test('should load without network errors', async ({ page }) => {
    const failedRequests: string[] = [];

    // Listen for failed network requests
    page.on('response', (response) => {
      if (!response.ok() && response.status() >= 400) {
        failedRequests.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify no failed requests
    expect(failedRequests).toEqual([]);
  });
});
