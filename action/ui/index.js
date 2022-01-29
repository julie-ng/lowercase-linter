'use strict'

const headings = require('./headings')
const colors = require('./colors')

const errorMsg = 'Invalid filenames with mixed case found. Please rename and use lower-case only.'

module.exports = {
	printStart: headings.printStart,
	errorIcon: colors.red('ⅹ'),
	okIcon: colors.green('✔'),
	errorMsg
}