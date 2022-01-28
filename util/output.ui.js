'use strict'

const colors = require('./colors')
const errorIcon = colors.red('ⅹ') // TODO
const caseHelper = require('./case')

// Headings
// --------

function startingCheckHeading () {
	console.log('')
	console.log(colors.yellow('Checking filenames'.toUpperCase()))
	// console.log(colors.yellow('----------------------------------'))
	// console.log('')
}

function _errorSummaryHeading (opts = { count: '' }) {
	console.log('')
// console.log(colors.yellow('-----------------'))
	console.log(colors.yellow(`ERRORS FOUND: ${opts.count}`))
	console.log('Mixed case filenames can cause problems when collaborating via git')
	console.log('because filenames are case in-sensitive Windows but sensistive in Linux.')
	console.log('')
	console.log(`Please rename the following ${colors.cyan('lowercase and use dashes')} per`)
	console.log('open source community best practices.')
	console.log('')
}

function _errorClosingHeading () {
	console.log('')
	console.log('Please rename your files, commit and push again before merging.')
	console.log('')
}

// Pretty
// ------


function prettyErrors (errors = []) {
	_errorSummaryHeading({ count: errors.length })
	errorSummary(errors)
	_errorClosingHeading()
}

function errorSummary (errors = []) {
	errors.forEach(function (e) {
		console.log(' ' + errorIcon + ' ' + e.path +  colors.yellow(' ==> ') + _filenameToSuggestion(e.path))
	})
}

function _filenameToSuggestion (pathname) {
	const suggest = []
	const parts = caseHelper.camelCaseToDash(pathname).split('/')

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
	prettyErrors: prettyErrors,
	startingCheck: startingCheckHeading
}
