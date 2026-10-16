In order to run the project locally, you will need these tools:

# Tools

**NVM** : https://github.com/creationix/nvm

> Using nvm, install node 20.x.x

# Commit

Please respect theses guidlines when contributing with commits : https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit

Summary:

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: common|core|theme
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test|chore
```

# Run Locally

To run the project:

1. run `nvm use` if you have nvm installed
2. run `npm ci`
3. run `npm start`

# Architecture decisions

This project records structuring decisions as Architecture Decision Records (ADRs) in [`docs/adr/`](docs/adr/README.md).

Write an ADR when you change a structuring dependency, a public output format, a public API contract, or a cross-cutting convention. A bug fix or a new addon that follows an existing pattern does not need one.

To write one:

1. Copy [`docs/adr/0000-template.md`](docs/adr/0000-template.md) to `docs/adr/NNNN-short-title-in-kebab-case.md`, using the next free four-digit number.
2. Set `status: 'proposed'` in the front matter and fill in the template.
3. Add a row to the index in [`docs/adr/README.md`](docs/adr/README.md), in the same pull request.
4. Switch the status to `accepted` once the pull request is merged.

See [`docs/adr/README.md`](docs/adr/README.md) for the full lifecycle, including how to supersede an accepted ADR.

# Deploy

For the moment, there is no deployment. But when it will be available, you will use `npm run release`

## Errors

If you got a "System limit for number of file watchers reached" error , take a look at this solution : [StackOverFlow Watching Error](https://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc/17437601#17437601)
