'use strict'

const strHelper = require('./../helpers/string-helper')
const caseHelper = require('./../helpers/case-helper')

function suggestion (filepath = '') {
	const noTrailingSlash = strHelper.noTrailingSlash(filepath)

	const original = noTrailingSlash.split('/')
	const originalName = original.pop()
	const originalDir = original.join('/') + '/'

	const suggested = caseHelper.toKebab(noTrailingSlash)
	const parts = suggested.split('/')
	const sgName = parts.pop()
	const sgDir = parts.join('/') + '/'

	return {
		original: {
			name: originalName,
			parentDir: originalDir,
			fullPath: originalDir + originalName
		},
		name: sgName,
		parentDir: sgDir,
		fullpath: suggested,
	}
}

module.exports = suggestion