# lowercase-only-action

[![ci](https://github.com/julie-ng/lowercase-only-action/actions/workflows/ci.yaml/badge.svg)](https://github.com/julie-ng/lowercase-only-action/actions/workflows/ci.yaml) 
[![Maintainability](https://api.codeclimate.com/v1/badges/d456de827d1bc27addb0/maintainability)](https://codeclimate.com/github/julie-ng/lowercase-only-action/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d456de827d1bc27addb0/test_coverage)](https://codeclimate.com/github/julie-ng/lowercase-only-action/test_coverage)

A GitHub Action to fail builds whos files have both upper and lower case mixed, i.e. camelCase to prevent filename conflicts and broken deployments.

### Features

- Suggests kebab-case fixes of problem filenames for quicker fixing
- No dependencies* - for faster CI builds and avoids supply chain security issues.
- Ignores common mixed case files that usually won't "break" builds, e.g. `CONTRIBUTING.md`

*Note: [GitHub Actions Toolkit](https://github.com/actions/toolkit) is still required and used for JavaScript based actions. 

## How to Use

### Inputs

- name: `path`  
  required: `false`  
	default: `.`  
	description: Path to scan for mixed case filenames. Will search subfolders too.	

### Outputs

- name: `errors`    
	description: Array of files with mixed case and suggested renames in JSON.

- name: `suggestions`   
	description: Multi-line string with list of suggested filename changes 

For details, see [action.yaml](./action.yaml)

### Example usage

```yaml
on: push

jobs:
  lint:
    runs-on: ubuntu-latest    
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Lint Filenames
        uses: julie-ng/lowercase-only@main
        id: lint_filenames
        continue-on-error: true
        with:
          path: '.'

      - name: Reference Outputs
        run: |          
          echo "${{ steps.lint_filenames.outputs.errors }}"
          echo "${{ steps.lint_filenames.outputs.suggestion }}"
```

Note: as of 29 January 2022, this action is not released/versioned.

---

## Case Sensitivity is a Challenge

If a system is case sensitive, then `README.md` and `readme.md` can co-exist. 

If a system is not case sensitive, then `Logo.png` can be referenced _both_ as its actual mixed case name _and_ all lowercase `logo.png`. So if you have `<img src="logo.png">` but your image is actually named `Logo.png`, it will work locally but users will see a broken image when deploy to a Linux based server.

| System | Case Sensistive |
|:--|:--|
| Windows | false, but preserves case |
| Mac (HFS+) | false, but preserves case |
| Git | true |
| Linux | true |

If you're collaborating and someone checks in a file with mixed case, it can be a nightmare to resolve because you have to do it in 2 places - OS and git. And if people don't keep their branches up to date, the mixed files come back like a recurring nightware.

### kebab-case suggestions

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
node ./test.js
```

### Lint

See configuration at [`.eslintrc`](./.eslintrc)

```
npm run lint
```

### Publishing Workflow

To avoid checking in `node_modules` per [GitHub Actions Docs](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action). Install [@vercel/ncc](https://github.com/vercel/ncc) if you don't already have it on your local machine.

```
npm i -g @vercel/ncc
```

Then compile everything into single [`dist/index.js`](./dist/index.js) file.

```
ncc build main.js --license licenses.txt
```