# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.0.0 (2022-02-04)

Initial release to lint filenames for mixed cases to avoid issues when collaborating across multiple operating systems and/or deploying to Linux.

### Features

- recursively checks subfolders
- suggests kebab-case version of invalid file names
- ignores common names by convention, e.g. `Readme.md`
- can post suggestions as comment to Pull Request