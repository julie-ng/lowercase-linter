'use strict'

const lint = require('./lint')
const headings = require('./ui/headings')
const suggestion = require( './suggestion' )
const ui = require('./ui')

function LinterError (errors, body = '') {
	this.message = ui.errorMsg
	this.invalidNames = errors
	this.body = body
}

function run (opts = {}) {
	opts.path = opts.path || '.'

	ui.printStart({ path: opts.path })

	const results = lint(opts)
	const errors = results.filter((m) => m.isValid === false)
	// console.log('errors', errors)

	const withSuggestions = []
	const body = []
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
			body.push(`  ${ui.errorIcon} ${s.original.fullPath}  ==>  ${s.fullpath}`)
		})

		headings.printErrorClosing()
		throw new LinterError(withSuggestions, body.join('\n'))
	} else {
		headings.printSuccess()
	}

	return {
		results: results,
		errors: withSuggestions
	}
}

module.exports = {
	run: run
}