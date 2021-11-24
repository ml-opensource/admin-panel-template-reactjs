# Contribution guide

## Project tools

- Github for code and issues management

### Branch rules

1. Following branches should be used for primary code management

   1. `main` there can be only this branch. This hold all the latest already released code.

   - in case we are doing tag based release, `main` can be used as stable bleeding edge releasable code.

2. `{type}/{GithubIssueNo}-issue-one-liner` should be the format for branch naming
   1. See [Type](#Type) section for branch `{type}`.
   2. Find `{GithubIssueNo}` in Github.

### Pull requests

Pull requests are the only way to propose a value you want to add. Following is a general workflow for submitting any requests.

1. Fork the repository
1. Clone the fork and create your branch from `main`.
1. If you've added code that should be tested, Ensure that your code doesn't fail to build
1. Make pull request to `main` branch

#### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system, CI configuration or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Any changes to our CI configuration files and scripts (Travis, Circle CI, BrowserStack, SauceLabs, AWS CodeBuild)
- **chore**: Other changes that don't modify `src` or `test` files
