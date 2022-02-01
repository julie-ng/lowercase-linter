'use strict'
const tap = require('tap')
const md = require('./markdown')

const errors = [
	{
		checkedPath: 'fixtures/AlsoBad',
		suggestedPath: 'fixtures/also-bad',
		isDirectory: true,
		isValid: false
	},
	{
		checkedPath: 'fixtures/AlsoBad/shouldFail.txt',
		suggestedPath: 'fixtures/also-bad/should-fail.txt',
		isDirectory: false,
		isValid: false
	}
]

const errorMdTable = [
	'| Actual Path | | Suggested Valid Path |',
	'|:--|:--|:--|',
	'| ❌ `fixtures/AlsoBad` | **→** | `fixtures/also-bad` |',
	'| ❌ `fixtures/AlsoBad/shouldFail.txt` | **→** | `fixtures/also-bad/should-fail.txt` |'
].join('\n')

tap.test('Errors to Markdown', (t) => {
	const markdown = md.errorsToTable(errors)
	t.equal(markdown, errorMdTable)
	t.end()
})