'use strict'
const icons = require('./icons')
const colors = require('./colors')
const suggestFix = require('./../linter/suggestion')
const messages = require( './messages' )

/**
 * UI for CLI - colored icons and text templates
 */

// RUN
// ---

function _startRun (path = '') { // ==> messages
	const toSearch = (path) ? colors.yellow(' in ') + colors.cyan(path) : ''
	return colors.yellow('Checking filenames'.toUpperCase()) + toSearch
}


// RESULTS
// -------
const results = {
	printLine (path, isValid) {
		const icon = isValid ? icons.ok : icons.error
		const line = `  ${icon} ${path}`
		console.log(line)
	},
}


// ERRORS
// ------

const errors = {
	count: (count) => colors.red(`ERRORS FOUND: ${count}`),
	intro: messages.error,
	pleaseRename: messages.rename,
	suggestions (errors) {
		const lines = []
		// console.log(errors)
		errors.forEach((e) => {
			let l = `${icons.error} ${e.checkedPath} ${colors.yellow('==>')} ${highlightFilename(e.suggestedPath)}`
			lines.push(l)
		})
		return lines.join('\n')
	}
}


// What to print?
// and add vertical padding
// --------------

function print (key, params = {}) {
	let o = ''

	switch (key) {

		case 'start':
			o = _startRun(params.path)
			break

		case 'success':
			o = messages.success
			break

		case 'suggestions':
			if (params.errors) {
				const lines = []
				lines.push(errors.count(params.errors.length))
				lines.push(messages.error)
				lines.push('')
				lines.push(errors.suggestions(params.errors))
				lines.push('')
				lines.push(messages.rename)
				o = lines.join('\n')
			}
			break

		case 'errors.count':
			if (params.count) {
				o = errors.count(params.count)
			} else {
				console.log('errors.count missing `count` param')
			}
			break
	}

	if (o === '') {
		throw 'ui.cli.print(key) - unknown key, dunno what to print.'
	}

	console.log(addVerticalMargins(o))
}

// TODO: actually this is quite complicated, theoretically must go through every part of URL
function highlightFilename (path) {
	const sugg = suggestFix(path)
	const dir = colors.dim(sugg.original.parentDir)
	const filename = (sugg.name === sugg.original.name)
		? colors.cyan(sugg.original.name)
		: colors.red(sugg.original.name)
	return dir + filename
}

function addVerticalMargins (str) {
	return '\n' + str + '\n'
}


module.exports = {
	print,
	results,
}