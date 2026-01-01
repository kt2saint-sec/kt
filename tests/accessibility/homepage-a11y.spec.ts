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
    const accessibilityScanResults = await makeAxeBuilder()
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
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

    // Test color contrast specifically
    const contrastScanResults = await makeAxeBuilder()
      .withRules(['color-contrast'])
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

    // Test keyboard navigation
    const firstFocusableElement = page.locator('a, button, input, [tabindex]:not([tabindex="-1"])').first();

    await firstFocusableElement.focus();
    const initiallyFocused = await page.evaluate(() => document.activeElement?.tagName);

    // Press Tab to move focus
    await page.keyboard.press('Tab');
    const nextFocused = await page.evaluate(() => document.activeElement?.tagName);

    // Ensure focus moved to a different element
    expect(nextFocused).not.toEqual(initiallyFocused);
  });
});
