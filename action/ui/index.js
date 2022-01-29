'use strict'

const headings = require('./headings')
const colors = require('./colors')

module.exports = {
	printStart: headings.printStart,
	errorIcon: colors.red('ⅹ'),
	okIcon: colors.green('✔')
}