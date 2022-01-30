'use strict'

const colors = require('./colors')

module.exports = {
	success: colors.green('👍 Success - no mixed case filenames found.'),
	error: 'Mixed pathnames found, which can create problems because git and Linux are case-sensitive.',
	rename: `Please rename to ${colors.cyan('lowercase-with-dashes')}.`
}
