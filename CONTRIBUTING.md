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

# Report an issue

Use the issue templates (`.github/ISSUE_TEMPLATE/`): **Bug report** for something that does not work, **Feature request** for an idea. Blank issues are disabled. For a bug, please give the TalkControl and reveal.js versions, your browser, and the smallest Markdown/HTML slide that reproduces it.

# Run Locally

To run the project:

1. run `nvm use` if you have nvm installed
2. run `npm ci`
3. run `npm start`

# Deploy

For the moment, there is no deployment. But when it will be available, you will use `npm run release`

## Errors

If you got a "System limit for number of file watchers reached" error , take a look at this solution : [StackOverFlow Watching Error](https://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc/17437601#17437601)
