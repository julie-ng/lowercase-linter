'use strict'

const lint = require('./lint')
const headings = require('./ui/headings')
const suggestion = require( './suggestion' )
const ui = require('./ui')

function run (opts = {}) {
	ui.printStart()

	const results = lint(opts)


	const errors = results.filter((m) => m.isValid === false)
	// console.log('errors', errors)

	const withSuggestions = []

	if (errors.length > 0) {
		headings.printErrorIntro({ count: errors.length })
		errors.forEach((e) => {
			const s = suggestion(e.path)
			e.suggestedFix = s.fullpath
			console.log(`  ${ui.errorIcon} ` + s.asText)

			withSuggestions.push({
				path: e.path,
				suggestedFix: s.fullpath,
				isDirectory: e.isDirectory,
				isValid: e.isValid,
				hasMixedCase: e.hasMixedCase
			})

		})
		headings.printErrorClosing()
	}

	return {
		results: results,
		errors: withSuggestions
	}
}

module.exports = {
	run: run
}