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