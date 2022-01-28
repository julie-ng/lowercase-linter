'use strict'

const colors = require('./colors')
const errorIcon = colors.red('ⅹ') // TODO
const util = require('./../util/case')
const headings = require('./headings')

function outputErrors (errors = []) {
	headings.errorSummary({ count: errors.length })
	errorSummary(errors)
	headings.errorClosing()
}

function errorSummary (errors = []) {
	errors.forEach(function (e) {
		console.log(' ' + errorIcon + ' ' + e.path +  colors.yellow(' ==> ') + _filenameToSuggestion(e.path))
	})
}

function _filenameToSuggestion (pathname) {
	const suggest = []
	const parts = util.camelCaseToDash(pathname).split('/')

	parts.forEach((p, i) => {
		if (i === parts.length-1) {
			suggest.push(colors.cyan(p))
		} else {
			suggest.push(colors.dim(p))
		}
	})

	return suggest.join(colors.dim('/'))
}

// Exports
// -------

module.exports = {
	outputErrors: outputErrors,
	_filenameToSuggestion: _filenameToSuggestion
}
