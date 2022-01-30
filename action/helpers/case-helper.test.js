'use strict'

const tap = require('tap')
const helper = require('./../helpers/case-helper')

tap.test('hasUpper()', t => {
	t.equal(helper.hasUpper('Abc'), true)
	t.equal(helper.hasUpper('ABC'), true)
	t.equal(helper.hasUpper('abc'), false)
	t.equal(helper.hasUpper('21c'), false)
	t.end()
})

tap.test('hasLower()', t => {
	t.equal(helper.hasLower('A'), false)
	t.equal(helper.hasLower('A1'), false)
	t.equal(helper.hasLower('ABC'), false)
	t.equal(helper.hasLower('Abc'), true)
	t.equal(helper.hasLower('abc'), true)
	t.equal(helper.hasLower('21c'), true)
	t.end()
})

tap.test('toKebab()', t => {
	t.equal(helper.toKebab('fooBar'), 'foo-bar')
	t.equal(helper.toKebab('FooBar'), 'foo-bar')
	t.equal(helper.toKebab('FOOBAR'), 'FOOBAR')
	t.equal(helper.toKebab('123'), '123')
	t.equal(helper.toKebab('ABC'), 'ABC')
	t.equal(helper.toKebab('abc'), 'abc')
	t.end()
})

tap.test('hasLowerExt()', t => {
	t.equal(helper.hasLowerExt('CONTRIBUTING.MD'), false)
	t.equal(helper.hasLowerExt('LICENSE'), false)
	t.equal(helper.hasLowerExt('README.md'), true)
	t.end()
})

tap.test('hasMixed()', t => {
	t.equal(helper.hasMixed('ABC'), false)
	t.equal(helper.hasMixed('abc'), false)
	t.equal(helper.hasMixed('aBc'), true)
	t.equal(helper.hasMixed('Abc'), true)
	t.equal(helper.hasMixed('AbC'), true)
	t.equal(helper.hasMixed('123'), false)
	t.equal(helper.hasMixed('B1'), false)
	t.equal(helper.hasMixed('1a'), false)
	t.end()
})

tap.test('_isException()', t => {
	t.equal(helper._isException('CONTRIBUTING.md'), true)
	t.equal(helper._isException('LICENSE.md'), true)
	t.equal(helper._isException('README.md'), true)
	t.equal(helper._isException('SECURITY.md'), true)

	t.equal(helper._isException('CODEOWNERS'), false)
	t.equal(helper._isException('LICENSE'), false)
	t.end()
})
