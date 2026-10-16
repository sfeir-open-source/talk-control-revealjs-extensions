import { PROJECT_ROOT } from './scripts/utils/dir.utils';
import { configDefaults } from 'vitest/config';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
    test: {
        // Playwright e2e specs live in e2e/ and are run via `npm run e2e`,
        // not Vitest.
        exclude: [...configDefaults.exclude, 'e2e/**'],
    },
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(PROJECT_ROOT, 'src', 'index.ts'),
            name: 'talk-control-revealjs-extensions',
            fileName: 'talk-control-revealjs-extensions',
        },
        outDir: path.resolve(PROJECT_ROOT, 'dist'),
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css'))
                        return 'talk-control-revealjs-theme.css';
                    return assetInfo.name ?? 'vendor.css';
                },
            },
        },
    },
    plugins: [dts({ rollupTypes: true })],
});
