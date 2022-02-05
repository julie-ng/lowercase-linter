# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.1](https://github.com/julie-ng/lowercase-linter-action/compare/v1.0.0...v1.0.1) (2022-02-05)


### Features

* **cli:** output action version from package.json ([5c8fca3](https://github.com/julie-ng/lowercase-linter-action/commit/5c8fca3b22a63d160e44ec0cc89f1cc2b09f5a1c))


### Bug Fixes

* check if pull request ([56f8a60](https://github.com/julie-ng/lowercase-linter-action/commit/56f8a6062044bb7ab32520875756b3b4827eaaf5))

## 1.0.0 (2022-02-04)

Initial release to lint filenames for mixed cases to avoid issues when collaborating across multiple operating systems and/or deploying to Linux.

### Features

- recursively checks subfolders
- suggests kebab-case version of invalid file names
- ignores common names by convention, e.g. `Readme.md`
- can post suggestions as comment to Pull Request