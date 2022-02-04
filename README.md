# lowercase-linter

[![ci](https://github.com/julie-ng/lowercase-linter/actions/workflows/ci.yaml/badge.svg)](https://github.com/julie-ng/lowercase-linter/actions/workflows/ci.yaml)
[![Maintainability](https://api.codeclimate.com/v1/badges/e938830e36c0a08beeb1/maintainability)](https://codeclimate.com/github/julie-ng/lowercase-linter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e938830e36c0a08beeb1/test_coverage)](https://codeclimate.com/github/julie-ng/lowercase-linter/test_coverage)

A GitHub Action to fail builds whos files have both upper and lower case mixed, i.e. camelCase to prevent filename conflicts and broken deployments.

### Features

- Suggests kebab-case fixes of problem filenames for quicker fixing
- No dependencies* - to avoid supply chain security issues.
- Ignores common mixed case files that usually won't "break" builds, e.g. `CONTRIBUTING.md`

*Note: [GitHub Actions Toolkit](https://github.com/actions/toolkit) is still required for JavaScript based actions. 

### Example Usage

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2

  - name: Lint Filenames
    uses: julie-ng/lowercase-linter@v1
    id: lint_filenames
    continue-on-error: true
    with:
      path: '.'
      pr-comment: true
      repo-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

- #### `path` (optional)  
  Path to scan for mixed case filenames. Will search subfolders too.  
  Default: `.`

- #### `pr-comment`  (optional)
  If file name errors are found, suggested fixes are posted to the Pull Request.  
  Default: `false`

- #### `repo-token`  (optional)
  GitHub Action workflow token needed to add comments to pull requests.  
  Default: `''`
  
## Outputs

- #### `errors`    
  Array - list of files with mixed case and suggested renames in JSON.

- #### `linted`   
  Array - list of all files that were checked for mixed case names.

- #### `comment-url`  
  String - URL of the comment posted to Pull Request (if errors were found).

## Why is Case Sensitivity a Challenge?

If a system is case sensitive, then `README.md` and `readme.md` can co-exist. 

If a system is not case sensitive, then `Logo.png` can be referenced _both_ as its actual mixed case name _and_ all lowercase `logo.png`. So if you have `<img src="logo.png">` but your image is actually named `Logo.png`, it will work *locally* but users will see a broken image when deployed to a Linux based server.

| System | Case Sensistive |
|:--|:--|
| Windows | false, but preserves case |
| Mac (HFS+) | false, but preserves case |
| Git | true |
| Linux | true |

Not deploying? Still a problem for colleagues. If you're collaborating and someone checks in a file with mixed case, it can be a nightmare to resolve because you have to do it in 2 places - OS and git. And if people don't keep their branches up to date, the mixed files come back like a recurring nightware 😵‍💫

### kebab-case suggestions

If you check the output, the action will also make suggestions using the [kebab-case naming convention](https://en.wikipedia.org/wiki/Letter_case#Kebab_case), for example:

| Original name | Suggested Name |
|:--|:--|
| `Foo/Bar.md` | `foo/bar.md` |
| `Foo/UppercaseExtension.MD` | `foo/uppercase-extension.md` |
| `FooBar/cat.txt` | `foobar/cat.txt` |
| `Foo` | `foo` |

## License

MIT