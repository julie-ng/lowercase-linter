'use strict'

const tap = require('tap')
const helper = require('./ui')
const c = require('./colors')

tap.test('hasMixedCase()', t => {
	t.equal(helper._filenameToSuggestion('dir/Bar.md'),  c.dim('dir') + c.dim('/') + c.cyan('bar.md'))
	t.equal(helper._filenameToSuggestion('Bar'),  c.cyan('bar'))
	t.same(helper._filenameToSuggestion('fixtures/Bad.md'), c.dim('fixtures') + c.dim('/') + c.cyan('bad.md'))


	t.same(helper._filenameToSuggestion('foo/barCat.txt'), c.dim('foo') + c.dim('/') + c.cyan('bar-cat.txt'))
	t.equal(helper._filenameToSuggestion('shouldFail'), c.cyan('should-fail'))
	t.end()
})
