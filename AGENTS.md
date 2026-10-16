# AGENTS.md

Agent guidance for the `talk-control-revealjs-extensions` repository.

## Project purpose

**TalkControl** is an open-source npm library (`@talk-control/talk-control-revealjs-extensions`) that extends [reveal.js](https://revealjs.com) with a full theming, i18n, and Markdown enrichment system. It targets anyone who wants to build professional slide decks with reveal.js without wiring up plugins manually.

The library ships:

-   A reveal.js plugin pair (markdown + theme)
-   A set of custom `marked` extensions (admonitions, icons, QR codes, column layouts, backgrounds)
-   LitHTML web components for the presentation shell and the live config panel
-   A SCSS theme (compiled to `dist/talk-control-revealjs-theme.css`)
-   Pre-bundled icon packs (Feather Icons, Font Awesome, Material Symbols)

Live demo: <https://talk-control-revealjs-extensions.netlify.app/>

## Tech stack & key versions

| Technology | Version           | Role                                                               |
| ---------- | ----------------- | ------------------------------------------------------------------ |
| Node.js    | 20 (see `.nvmrc`) | Runtime                                                            |
| TypeScript | ^5.2              | Language — `ES2020` target, strict mode                            |
| Vite       | ^5.3              | Library bundler (ESM + UMD + `.d.ts` rollup via `vite-plugin-dts`) |
| Vitest     | ^1.6              | Unit testing                                                       |
| reveal.js  | ^5.1              | Presentation engine (peer dep + re-exported)                       |
| marked     | ^5.0              | Markdown parser (peer dep)                                         |
| LitHTML    | ^3.1              | Web components for the UI shell                                    |
| Sass       | ^1.77             | SCSS compilation                                                   |
| ESLint     | ^9.6              | Linting                                                            |
| Prettier   | ^3.3              | Formatting                                                         |

Output format: dual ESM (`dist/talk-control-revealjs-extensions.js`) + UMD (`.umd.cjs`) + type declarations (`.d.ts`).

## Commands

```bash
npm install          # Install dependencies
npm run start        # Dev server at localhost:4242 (builds on src change, live-reloads demo)
npm run build        # tsc + vite build → dist/ (postbuild copies to demo/)
npm run test         # Vitest (watch mode)
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run prettier     # Check formatting
npm run prettier:fix # Fix formatting
```

Run a single test file: `npx vitest run src/addons/tc-copy-clipboard.spec.ts`

```bash
npm run e2e          # Playwright end-to-end tests (Chromium + Firefox), against demo/
```

CI runs `lint` → `prettier` → `agents:check` → `test` → `e2e` on every push to `main` and every PR.

## Architecture

This is a **library** (not an app). The build output is `dist/`; the `demo/` folder is a static reveal.js presentation used exclusively for manual testing during development.

### Consumer entry point

`ThemeInitializer.init()` (`src/theme-initializer.ts`) is the single function consumers call:

1. Reads `showType`, `lang`, `theme` from URL params / HTML `data-*` attributes
2. Renders slide `<section>` elements into the DOM using LitHTML (or a custom `slidesRenderer`)
3. Registers `RevealTalkControlMarkdownPlugin` — wraps `RevealMarkdown`, injects all `marked` extensions
4. Registers `RevealTalkControlThemePlugin` — runs DOM transforms on the `ready` event
5. Calls `Reveal.initialize()`

Public API is re-exported from `src/index.ts`.

### Plugin split

| File                             | Plugin id               | Responsibility                                                                           |
| -------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| `src/theme-initializer.ts`       | —                       | Orchestration, LitHTML rendering, Reveal init                                            |
| `src/marked/tc-marked-plugin.ts` | `talk-control-markdown` | Wraps `RevealMarkdown`; registers marked extensions post-init (init resets the renderer) |
| `src/theme-plugin.ts`            | `talk-control-theme`    | `Reveal ready` hook: backgrounds, columns, copy-clipboard, data-type                     |

### Addons (`src/addons/`)

Each addon is a standalone module with its own `.spec.ts`:

| Addon                  | What it does                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `tc-copy-clipboard`    | Adds a copy button to code blocks                            |
| `tc-custom-background` | Maps CSS class names on `<section>` to CSS background values |
| `tc-data-type`         | Manages `data-type` (show type: `on-stage`, `training`, …)   |
| `tc-theme`             | Manages `data-theme` attribute                               |
| `tc-i18n`              | Manages `data-lang` and Markdown file path resolution        |
| `tc-multiples-cols`    | Post-processes column layout HTML                            |
| `tc-ui-config`         | Config panel opened with the `C` key                         |
| `tc-list-fragment`     | Transforms list items into reveal fragments                  |

### Marked extensions (`src/marked/`)

Custom `marked` extensions that parse non-standard Markdown into reveal-compatible HTML:

| Extension              | Syntax                                         |
| ---------------------- | ---------------------------------------------- |
| `marked-tc-admonition` | `:::note`, `:::warning` blocks                 |
| `marked-tc-bg`         | `<!-- bg:… -->` comments for slide backgrounds |
| `marked-tc-cols`       | Column layout syntax                           |
| `marked-tc-icons`      | Icon shorthand (e.g. `::icon-name::`)          |
| `marked-tc-qrcode`     | QR code generation                             |

### UI components (`src/ui/`)

LitHTML web components:

| Component                 | Role                   |
| ------------------------- | ---------------------- |
| `tc-talk-control-element` | Main wrapper element   |
| `tc-revealjs-element`     | reveal.js container    |
| `tc-configurator-element` | Config panel (`C` key) |
| `tc-tree-slides-element`  | Slide navigator        |

### Icon packs (`src/icons-config/`)

`feather-icons-pack`, `font-awesome-pack`, `material-symbols-pack` each export a `MarkedTcIconsOptions` object ready to pass as `tcMarkedOptions.fontIcons[n]`.

### SCSS (`src/scss/theme/`)

SCSS theme variables and component styles. `src/index.scss` imports reveal.js base CSS, a highlight.js theme, and the TalkControl SCSS tree. The compiled output is `dist/talk-control-revealjs-theme.css`.

### Demo loop (`demo/`)

`scripts/prepare-demo.ts` copies `dist/` into `demo/web_modules/`. `npm run start` chains three parallel processes: `_on-change:build` (rebuild on `src/` change) → `_on-change:copy` (copy `dist/` to `demo/` on change) → `_serve` (live-server on port 4242).

## Conventions

### Commit messages

Conventional commits, in English, no Gitmoji:

```
feat | fix | docs | style | refactor | perf | test | chore | ci | build | revert | BREAKING CHANGE | WIP
```

### Tests

Vitest. Use `describe`/`it`, `beforeEach`/`afterEach`, `expect`. Mock with `vi.fn()`, `vi.spyOn()`, `vi.mock()`, `vi.clearAllMocks()` — only when necessary.

Functions exposed only for tests are exported under a `_internals` guard:

```ts
export const _internals =
    typeof process !== 'undefined' && process?.env?.NODE_ENV === 'test'
        ? { _myPrivateFunction }
        : undefined;
```

### TypeScript

Strict mode. `ES2020` target. `experimentalDecorators` enabled (required by LitHTML). `noUnusedLocals` and `noUnusedParameters` enforced.

## AI tooling

This repo ships configuration for several agent tools (Claude Code, Gemini CLI, opencode, `.agents/`-compatible tools). Two rules keep it maintainable:

### Skills — single source of truth

`.agents/skills/` is the **canonical source** for agent skills. The copies under `.claude/skills/`, `.gemini/skills/` and `.opencode/command/` are **generated** (they carry an `AUTO-GENERATED` banner) — never edit them directly.

```bash
npm run agents:sync   # regenerate tool-specific copies from .agents/
npm run agents:check  # verify copies are in sync (runs in CI, fails on drift)
```

To change a skill: edit the file under `.agents/skills/`, run `npm run agents:sync`, commit source + generated copies together. The manifest lives in `scripts/sync-agents.ts`.

### Post-edit formatting hook — single implementation

`.hooks/post-file-change.sh` is the shared formatter: it lints and formats **only the changed file** when it matches `src/**/*.{ts,scss}`. Every tool-specific hook config (`.claude/settings.json`, `.agents/hooks.json`, `.gemini/settings.json`, `.opencode/plugin/auto-format.ts`) is a thin adapter that extracts the file path and calls this script. Change formatting behavior in the script, not in the adapters.
