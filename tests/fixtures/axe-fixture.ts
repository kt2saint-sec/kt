import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Playwright test fixture with axe-core accessibility testing
 *
 * Usage:
 * import { test, expect } from './fixtures/axe-fixture';
 *
 * test('page should be accessible', async ({ page, makeAxeBuilder }) => {
 *   await page.goto('/');
 *   const accessibilityScanResults = await makeAxeBuilder().analyze();
 *   expect(accessibilityScanResults.violations).toEqual([]);
 * });
 */

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

// Extend base test with axe-core fixture
export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        // Optionally configure axe-core rules
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#some-test-id-to-exclude'); // Example: exclude test elements

    await use(makeAxeBuilder);
  },
});

export { expect } from '@playwright/test';
