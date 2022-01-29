# action-lowercase-only

[![ci](https://github.com/julie-ng/action-lowercase-only/actions/workflows/ci.yaml/badge.svg)](https://github.com/julie-ng/action-lowercase-only/actions/workflows/ci.yaml) 
[![Maintainability](https://api.codeclimate.com/v1/badges/215f41e69f428205e28e/maintainability)](https://codeclimate.com/github/julie-ng/action-lowercase-only/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/215f41e69f428205e28e/test_coverage)](https://codeclimate.com/github/julie-ng/action-lowercase-only/test_coverage)

A GitHub Action to fail builds whos files have both upper and lower case mixed, i.e. camelCase to prevent filename conflicts and broken deployments.

### Features

- Suggests kebab-case fixes of problem filenames for quicker fixing
- No dependencies required - for faster CI builds and avoids supply chain security issues
- Ignores common mixed case files that usually won't "break" builds, e.g. `CONTRIBUTING.md`

### Case Sensitivity Problems

If a system is case sensitive, then `README.md` and `readme.md` can co-exist. 

If a system is not case sensitive, then `Logo.png` can be referenced _both_ as its actual mixed case name _and_ all lowercase `logo.png`. So if you have `<img src="logo.png">` but your image is actually named `Logo.png`, it will work locally but users will see a broken image when deploy to a Linux based server.

| System | Case Sensistive |
|:--|:--|
| Windows | false, but preserves case |
| Mac (HFS+) | false, but preserves case |
| Git | true |
| Linux | true |

If you're collaborating and someone checks in a file with mixed case, it can be a nightmare to resolve because you have to do it in 2 places - OS and git. And if people don't keep their branches up to date, the mixed files come back like a recurring nightware.

## Suggested Filename Changes

If you check the output, the action will also make suggestions using the [kebab-case naming convention](https://en.wikipedia.org/wiki/Letter_case#Kebab_case), for example:

| Original name | Suggested Name |
|:--|:--|
| `Foo/Bar.md` | `foo/bar.md` |
| `Foo/UppercaseExtension.MD` | `foo/uppercase-extension.md` |
| `FooBar/cat.txt` | `foobar/cat.txt` |
| `Foo` | `foo` |

## Contributing

To contribute, ensure tests (using [tap](https://www.npmjs.com/package/tap) testing library) and linter pass before making a Pull Request.


### Tests

To test logic

```
npm run test
```

To test output, which will check against `fixtures/` directory. You can eyeball if the results are correct.

```
node ./action.js
```

### Lint

Ssee configuration at [`.eslintrc`](./.eslintrc)

```
npm run lint
```
