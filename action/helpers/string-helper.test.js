'use strict'

const tap = require('tap')
const helper = require('./string-helper')

tap.test('noTrailingSlash()', t => {
	t.equal(helper.noTrailingSlash('foo'), 'foo')
	t.equal(helper.noTrailingSlash('foo/barCat/'), 'foo/barCat')
	t.equal(helper.noTrailingSlash('foo/bar/'), 'foo/bar')
	t.equal(helper.noTrailingSlash('foo/Bar/cat'), 'foo/Bar/cat')
	t.end()
})