'use strict'

const colors = require('./ui/colors')
const util = require('./util')

const yellowArrow = colors.yellow(' ==> ')

function suggestion (filepath = '') {
	const noTrailingSlash = util.noTrailingSlash(filepath)

	const original = noTrailingSlash.split('/')
	const originalName = original.pop()
	const originalDir = original.join('/') + '/'

	const suggested = util.camelCaseToDash(noTrailingSlash)
	const parts = suggested.split('/')
	const sgName = parts.pop()
	const sgDir = parts.join('/') + '/'
	const sgNameColored = colors.cyan(sgName)
	const sgDirColored = colors.dim(sgDir)

	return {
		original: {
			name: originalName,
			parentDir: originalDir,
		},
		name: sgName,
		parentDir: sgDir,
		fullpath: suggested,
		fullpathColored: sgDirColored + sgNameColored,
		asText: noTrailingSlash + yellowArrow + sgDirColored + sgNameColored,
	}
}

module.exports = suggestion