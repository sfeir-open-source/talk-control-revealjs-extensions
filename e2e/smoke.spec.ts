import { expect, test } from '@playwright/test';

import { waitForDeckReady } from './helpers';

test('demo deck loads without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (message) => {
        if (message.type() === 'error') {
            consoleErrors.push(message.text());
        }
    });
    page.on('pageerror', (error) => {
        pageErrors.push(error.message);
    });

    await page.goto('/index.html');
    await waitForDeckReady(page);

    await expect(page.locator('.reveal .slides section').first()).toBeVisible();

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
});
