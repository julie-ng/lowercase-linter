const tap = require('tap')
const helper = require('./case')

tap.test('hasMixedCase()', t => {
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

tap.test('camelCaseToDash()', t => {
	t.equal(helper.camelCaseToDash('fooBar'), 'foo-bar')
	t.equal(helper.camelCaseToDash('FooBar'), 'foo-bar')
	t.equal(helper.camelCaseToDash('FOOBAR'), 'FOOBAR')
	t.equal(helper.camelCaseToDash('123'), '123')
	t.equal(helper.camelCaseToDash('ABC'), 'ABC')
	t.equal(helper.camelCaseToDash('abc'), 'abc')
	t.end()
})

tap.test('_hasUpperCase()', t => {
	t.equal(helper._hasUpperCase('Abc'), true)
	t.equal(helper._hasUpperCase('ABC'), true)
	t.equal(helper._hasUpperCase('abc'), false)
	t.equal(helper._hasUpperCase('21c'), false)
	t.end()
})

tap.test('_hasLowerCase()', t => {
	t.equal(helper._hasLowerCase('A'), false)
	t.equal(helper._hasLowerCase('A1'), false)
	t.equal(helper._hasLowerCase('ABC'), false)
	t.equal(helper._hasLowerCase('Abc'), true)
	t.equal(helper._hasLowerCase('abc'), true)
	t.equal(helper._hasLowerCase('21c'), true)
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


tap.test('_isExtensionLowerCase()', t => {
	t.equal(helper._isExtensionLowerCase('CONTRIBUTING.MD'), false)
	t.equal(helper._isExtensionLowerCase('LICENSE'), false)
	t.equal(helper._isExtensionLowerCase('README.md'), true)
	t.end()
})
