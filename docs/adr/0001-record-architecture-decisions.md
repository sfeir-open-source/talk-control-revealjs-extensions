---
status: 'accepted'
date: 2026-10-16
decision-makers: ['jefBinomed']
---

# Record architecture decisions

## Context and Problem Statement

`talk-control-revealjs-extensions` has accumulated several structuring
decisions over time — how reveal.js is wrapped, how the UI is built, how the
library is bundled, how dependencies are shared with consumers — without a
written record of the context, the alternatives, and the trade-offs behind
each one. Contributors (human or agent) have no single place to check before
reconsidering a structuring choice, which risks re-litigating settled
questions or silently drifting away from them. How do we record structuring
decisions so they stay discoverable and are not rewritten after the fact?

## Considered Options

-   No formal record — rely on commit messages, pull request descriptions,
    and issue history.
-   A single `ARCHITECTURE.md` or `DECISIONS.md` file, updated in place.
-   Architecture Decision Records (ADRs), one immutable file per decision, in
    `docs/adr/`.

## Decision Outcome

Chosen option: "Architecture Decision Records (ADRs), one immutable file per
decision, in `docs/adr/`", using a lightweight
[MADR 4](https://adr.github.io/madr/) template (see
[`0000-template.md`](./0000-template.md)) that keeps _Considered Options_,
_Decision Outcome_, and _Consequences_, and leaves _Decision Drivers_ and
_Pros and Cons of the Options_ optional. A single living document conflates
distinct decisions and invites rewriting history in place; a sequence of
small, numbered, immutable records keeps each decision's context attached to
it and makes the project's decision history reviewable through normal pull
requests, without adding a dependency or a generator (no `adr-tools`, no
`log4brains`): the repository is small enough to write the template and the
index by hand.

## Consequences

-   Good, because every structuring decision has one canonical, dated, and
    reviewable record, kept next to the code it describes.
-   Good, because the convention is plain Markdown: no tool to install, no
    build step, reviewable in any pull request.
-   Bad, because the index in `docs/adr/README.md` is maintained by hand and
    can drift if a contributor forgets to update it when adding an ADR.
-   Bad, because writing an ADR retroactively for a decision made before this
    process existed relies on reading the code and the git history rather
    than on a decision actually witnessed at the time; such ADRs are marked
    as recorded retroactively.

## More Information

This ADR documents the adoption of the process itself, not any decision
about the codebase. See `docs/adr/README.md` for when and how to write an
ADR. Retroactive ADRs for existing structuring decisions (the reveal.js
markdown plugin wrapper, the LitHTML-based UI, the Vite ESM/UMD build, the
shared peer dependencies, the single-source agent skills) are tracked as a
separate, later change — not part of putting this process in place.
