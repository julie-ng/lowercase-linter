'use strict'

const tap = require('tap')
// const colors = require('./ui/colors')
const suggestion = require('./suggestion')

tap.test('suggestion()', t => {
	tap.test('single file', t => {
		const s = suggestion('Abc.md')
		t.equal(s.original.name, 'Abc.md')
		t.equal(s.name, 'abc.md')
		t.end()
	})

	tap.test('camelCase', t => {
		const s = suggestion('FooBar.md')
		t.equal(s.original.name, 'FooBar.md')
		t.equal(s.name, 'foo-bar.md')
		t.end()
	})

	tap.test('file extension', t => {
		const s = suggestion('foo.MD')
		t.equal(s.original.name, 'foo.MD')
		t.equal(s.name, 'foo.md')
		t.end()
	})

	tap.test('trailing slashes', t => {
		const s = suggestion('foo/BarCat/')
		t.equal(s.original.name, 'BarCat')
		t.equal(s.original.parentDir, 'foo/')
		t.equal(s.name, 'bar-cat')
		t.equal(s.parentDir, 'foo/')
		t.end()
	})

	tap.test('subdir with mixed file', t => {
		const s = suggestion('/foo/Bar.md')
		t.equal(s.original.name, 'Bar.md')
		t.equal(s.original.parentDir, '/foo/')
		t.equal(s.name, 'bar.md')
		t.equal(s.fullpath, '/foo/bar.md')
		// t.equal(s.fullpathColored, colors.dim('/foo/') + colors.cyan('bar.md'))
		t.end()
	})

	t.end()
})
