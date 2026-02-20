/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { transformListFragment } from './tc-list-fragment'; // Ajuste le chemin d'import

describe('transformListFragment', () => {
    // Nettoie le DOM avant chaque test
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('should add fragment class to all li elements in a ul with list-fragment class', () => {
        // Arrange
        document.body.innerHTML = `
            <div class="reveal">
                <div class="slides">
                    <section>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li class="list-fragment">Item 3</li>
                        </ul>
                    </section>
                </div>
            </div>
        `;

        // Act
        transformListFragment();

        // Assert
        const listItems = document.querySelectorAll('li');
        listItems.forEach((item) => {
            expect(item.classList.contains('fragment')).toBe(true);
        });
    });

    it('should handle nested markdown elements inside li', () => {
        // Arrange
        document.body.innerHTML = `
            <div class="reveal">
                <div class="slides">
                    <section>
                        <ul>
                            <li>
                                <strong class="list-fragment">Bold text</strong>
                            </li>
                            <li>Item 2</li>
                        </ul>
                    </section>
                </div>
            </div>
        `;

        // Act
        transformListFragment();

        // Assert
        const listItems = document.querySelectorAll('li');
        listItems.forEach((item) => {
            expect(item.classList.contains('fragment')).toBe(true);
        });
    });

    it('should work with ordered lists (ol)', () => {
        // Arrange
        document.body.innerHTML = `
            <div class="reveal">
                <div class="slides">
                    <section>
                        <ol>
                            <li>Item 1</li>
                            <li class="list-fragment">Item 2</li>
                        </ol>
                    </section>
                </div>
            </div>
        `;

        // Act
        transformListFragment();

        // Assert
        const listItems = document.querySelectorAll('li');
        listItems.forEach((item) => {
            expect(item.classList.contains('fragment')).toBe(true);
        });
    });

    it('should handle nested markdown elements inside li if ul old the class', () => {
        // Arrange
        document.body.innerHTML = `
            <div class="reveal">
                <div class="slides">
                    <section>
                        <ul class="list-fragment">
                            <li>Item 1</li>
                            <li>Item 2</li>
                        </ul>
                    </section>
                </div>
            </div>
        `;

        // Act
        transformListFragment();

        // Assert
        const listItems = document.querySelectorAll('li');
        listItems.forEach((item) => {
            expect(item.classList.contains('fragment')).toBe(true);
        });
    });

    it('should handle nested markdown elements inside li if ol old the class', () => {
        // Arrange
        document.body.innerHTML = `
            <div class="reveal">
                <div class="slides">
                    <section>
                        <ol class="list-fragment">
                            <li>Item 1</li>
                            <li>Item 2</li>
                        </ol>
                    </section>
                </div>
            </div>
        `;

        // Act
        transformListFragment();

        // Assert
        const listItems = document.querySelectorAll('li');
        listItems.forEach((item) => {
            expect(item.classList.contains('fragment')).toBe(true);
        });
    });

    it('should not affect lists without list-fragment class', () => {
        // Arrange
        document.body.innerHTML = `
            <div class="reveal">
                <div class="slides">
                    <section>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                        </ul>
                    </section>
                </div>
            </div>
        `;

        // Act
        transformListFragment();

        // Assert
        const listItems = document.querySelectorAll('li');
        listItems.forEach((item) => {
            expect(item.classList.contains('fragment')).toBe(false);
        });
    });
});
