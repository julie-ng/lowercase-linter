'use strict'
const fs = require('fs')
const path = require('path')

const caseHelper = require('./../helpers/case-helper')
const exceptions = require('./exceptions')
const suggestFix = require('./suggestion')

/**
 * Checks a single path for mixed case
 *
 * @param {String} dir - parent directory of file
 * @param {String} f - filename
 * @returns {Object} result
 */
function filecheck (dir, f) {
	const fullpath = path.join(dir, f)
	const stats = fs.lstatSync(fullpath)
	const hasMixedCase = caseHelper.hasMixed(fullpath)
	const isValid = hasMixedCase === false || exceptions.alwaysValid.includes(f)

	return {
		checkedPath: fullpath,
		suggestedPath: suggestFix(fullpath).fullpath,
		isDirectory: stats.isDirectory(),
		isValid: isValid,
		hasMixedCase: hasMixedCase,
		shouldDeepCheck: stats.isDirectory() && !exceptions.alwaysSkip.includes(f)
	}
}

module.exports = filecheck