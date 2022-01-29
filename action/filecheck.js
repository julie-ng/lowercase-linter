'use strict'
const fs = require('fs')
const path = require('path')
const ui = require('./ui')
const caseHelper = require('./util')
const exceptions = require('./exceptions')

/**
 * Checks a single file for mixed case
 *
 * @param {String} dir
 * @param {String} f
 * @returns {Object}
 */
function filecheck (dir, f) {
	const fullpath = path.join(dir, f)
	const stats = fs.lstatSync(fullpath)
	const hasMixedCase = caseHelper.hasMixed(fullpath)
	const isValid = hasMixedCase === false || exceptions.alwaysValid.includes(f)

	const icon = isValid
		? ui.okIcon
		: ui.errorIcon

	return {
		path: fullpath,
		isDirectory: stats.isDirectory(),
		isValid: isValid,
		toStr: ' ' + icon + ' ' + fullpath,
		hasMixedCase: hasMixedCase,
		shouldDeepCheck: stats.isDirectory() && !exceptions.alwaysSkip.includes(f)
	}
}

module.exports = filecheck