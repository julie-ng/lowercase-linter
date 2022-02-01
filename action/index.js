'use strict'

const core = require('@actions/core')
const postErrorsToPullRequest = require('./github/add-comment')
const lint = require('./linter/run')
const ui = require('./cli')

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
 * @return {Array} all -list of objects with `checkedPath`, `suggestedPath`, `isDirectory` and `isValid` properties.
 * @return {Array} errors - list of objectd with same properties as above.
 */
async function run (opts = {}) {
	// console.log('Hello - change to trigger Workflow run. Remember to do ncc builds too!')
	console.log('Hello - 3')
	const toLint = opts.path || '.'

	ui.cli.print('start', { path: toLint })

	try {
		const linted = lint({ path: toLint })
		const errors = linted.filter((m) => m.isValid === false)

		if (errors.length === 0) {
			ui.cli.print('success')
			return {
				all: linted,
				errors: [],
				commentUrl: ''
			}
		} else {
			ui.cli.print('suggestions', { errors: errors })
			const commentUrl = await addComment(linted, errors)

			return {
				all: linted,
				errors: errors,
				commentUrl: commentUrl
			}
		}
	} catch (err) {
		console.error(`Could not lint path ${toLint}`)
		console.error(err)
		process.exit(1)
	}
}

async function addComment (linted, errors) {
	if (process.env.NODE_ENV === 'local') {
		return 'local-test-has-no-url'
	} else {
		return await postErrorsToPullRequest(errors)
	}
}

module.exports = {
	run: run
}