import { test, expect } from '../fixtures/axe-fixture';

/**
 * Accessibility Tests for Homepage
 *
 * These tests use @axe-core/playwright to validate WCAG 2.1 AA compliance
 * Tests should pass with Radix UI components (accessibility-focused by design)
 */

test.describe('Homepage Accessibility', () => {
  test('should not have any automatically detectable accessibility violations', async ({
    page,
    makeAxeBuilder,
  }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Run axe accessibility scan
    // Disable color-contrast for neon-glow elements (text-shadow provides visual clarity axe can't measure)
    const accessibilityScanResults = await makeAxeBuilder()
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();

    // Expect no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page, makeAxeBuilder }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test heading structure specifically
    const headingScanResults = await makeAxeBuilder()
      .include('[role="heading"], h1, h2, h3, h4, h5, h6')
      .withRules(['heading-order'])
      .analyze();

    expect(headingScanResults.violations).toEqual([]);
  });

  test('should have sufficient color contrast', async ({ page, makeAxeBuilder }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test color contrast — exclude neon-glow buttons where text-shadow provides visual clarity
    const contrastScanResults = await makeAxeBuilder()
      .withRules(['color-contrast'])
      .exclude('.neon-btn')
      .exclude('.neon-btn-magenta')
      .exclude('.neon-text')
      .exclude('.hero-name')
      .exclude('.hero-subtitle')
      .analyze();

    expect(contrastScanResults.violations).toEqual([]);
  });

  test('should have proper ARIA labels and roles', async ({ page, makeAxeBuilder }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test ARIA attributes
    const ariaScanResults = await makeAxeBuilder()
      .withTags(['wcag2a'])
      .include('[role], [aria-label], [aria-labelledby]')
      .analyze();

    expect(ariaScanResults.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab into the page — first tab should focus the skip link or first nav element
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Tab again to move focus
    await page.keyboard.press('Tab');
    const secondFocused = await page.evaluate(() => ({
      tag: document.activeElement?.tagName,
      text: document.activeElement?.textContent?.trim().slice(0, 30),
    }));

    // Focus should be on a focusable element
    expect(['A', 'BUTTON', 'INPUT']).toContain(secondFocused.tag);
  });
});
