import type { Page } from '@playwright/test';

declare global {
    interface Window {
        // Exposed by demo/scripts/slides.js for e2e navigation purposes.
        Reveal: {
            isReady: () => boolean;
            slide: (h: number, v?: number) => void;
        };
    }
}

/**
 * Wait until the Reveal deck has finished initializing.
 * @param {Page} page
 */
export async function waitForDeckReady(page: Page): Promise<void> {
    await page.waitForFunction(
        () => typeof window.Reveal !== 'undefined' && window.Reveal.isReady()
    );
}

/**
 * Navigate to a given slide using the Reveal.js public API, waiting for the
 * deck to be ready first.
 * @param {Page} page
 * @param {number} h horizontal slide index
 * @param {number} v vertical slide index (default 0)
 */
export async function gotoSlide(page: Page, h: number, v = 0): Promise<void> {
    await waitForDeckReady(page);
    await page.evaluate(({ h, v }) => window.Reveal.slide(h, v), { h, v });
}
