'use strict'

/**
 * Linter specific string helpers
 */

function hasTrailingSlash (str) {
	return str[str.length-1] === '/'
}

function noTrailingSlash (str) {
	if (hasTrailingSlash(str)) {
		const parts = str.split('/')
		return parts.slice(0, parts.length-1).join('/')
	} else {
		return str
	}
}

module.exports = {
	hasTrailingSlash,
	noTrailingSlash
}
