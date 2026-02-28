import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Neon City Portfolio
 *
 * Tests navigation, section rendering, and core user flows
 */

test.describe('Portfolio Navigation', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Karl Toussaint/i);
  });

  test('should display main navigation with all section links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    // On mobile, open hamburger menu first
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      const hamburger = nav.getByRole('button', { name: 'Toggle navigation menu' });
      await hamburger.click();
    }

    // Verify all nav items exist
    for (const label of ['Home', 'About', 'Projects', 'Services', 'Contact']) {
      await expect(nav.getByRole('button', { name: label })).toBeVisible();
    }
  });

  test('should navigate to sections via nav buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Ensure viewport is wide enough for desktop nav
    await page.setViewportSize({ width: 1280, height: 720 });

    // Click About nav button
    const aboutBtn = page.locator('nav').getByRole('button', { name: 'About' });
    await aboutBtn.waitFor({ state: 'visible', timeout: 5000 });
    await aboutBtn.click();
    await page.waitForTimeout(1000);

    // About section should be scrolled into view
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeAttached();
  });

  test('should render hero section with name and CTAs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for animations to complete
    await page.waitForTimeout(3000);

    await expect(page.getByRole('heading', { name: 'Karl Toussaint', level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'About Me' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View Projects' })).toBeVisible();
  });

  test('should display about section content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // About section should have the heading
    const aboutHeading = page.locator('#about').getByText('About');
    await expect(aboutHeading).toBeVisible();
  });

  test('should handle responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Body renders
    await expect(page.locator('body')).toBeVisible();

    // Name is still visible
    await page.waitForTimeout(3000);
    await expect(page.getByRole('heading', { name: 'Karl Toussaint', level: 1 })).toBeVisible();
  });

  test('should have skip link for keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toHaveCount(1);
  });

  test('should have working internal links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // KT logo link goes home
    const logoLink = page.locator('a[href="/"]').first();
    await expect(logoLink).toBeVisible();
  });
});

test.describe('Portfolio Sections', () => {
  test('should render all five main sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    for (const id of ['home', 'about', 'projects', 'services', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('should render project cards with links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to projects
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // At least one project link should exist
    const projectLinks = page.locator('a[href^="/project/"]');
    expect(await projectLinks.count()).toBeGreaterThan(0);
  });

  test('should render contact form with required fields', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(page.getByRole('button', { name: "Let's Build Something" })).toBeVisible();
  });

  test('should have no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out React DevTools message which is informational
    const realErrors = consoleErrors.filter(
      (e) => !e.includes('Download the React DevTools')
    );
    expect(realErrors).toEqual([]);
  });

  test('should load without network errors', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('response', (response) => {
      if (!response.ok() && response.status() >= 400) {
        failedRequests.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(failedRequests).toEqual([]);
  });
});
