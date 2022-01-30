'use strict'

const lint = require('./linter/run')
const ui = require('./cli')

// const addComment = require('./add-comment')

// function LinterError (errors, body = '') {
// 	this.message = ui.errorMsg
// 	this.invalidNames = errors
// 	this.body = body
// }

/**
 * Run Action
 *
 * @param {*} opts
 * @param {String} [opts.path='.'] - path to lint. Defaults to '.'
 */
function run (opts = {}) {
	const toLint = opts.path || '.'

	ui.cli.print('start', { path: toLint })

	try {
		const results = lint({ path: toLint })
		// console.log(results)
		const errors = results.filter((m) => m.isValid === false)
		if (errors.length > 0) {
			// console.log(errors)
			ui.cli.print('suggestions', { errors: errors })
			// addPRComment(errors) <<== TODO
		} else {
			ui.cli.print('success')
		}

		return {
			results,
			errors
		}
	} catch (err) {
		console.error('Could not lint path')
		console.error(err)
		process.exit(1)
	}
}


// function addPRComment (errors) {
// 	console.log('addPRComment() - todo')
// 	// 	// test add comment
// 	// 	// addComment(body).then(() => {
// 	// 	// 	throw new LinterError(withSuggestions, body.join('\n'))
// 	// 	// })
// }

// function errorsToMarkdown () {

// }

module.exports = {
	run: run
}