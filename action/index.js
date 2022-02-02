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
	console.log('Hello - 4')
	const toLint = opts.path || '.'

	ui.cli.print('start', { path: toLint })

	try {
		const shouldComment = core.getInput('add-suggestions-to-pr')
		const linted = lint({ path: toLint })
		const errors = linted.filter((m) => m.isValid === false)
		let results = {
			all: linted,
			errors: [],
			commentUrl: ''
		}

		if (errors.length === 0) {
			ui.cli.print('success')
		} else {
			ui.cli.print('suggestions', { errors: errors })
			results.errors = errors
			if (shouldComment) {
				results.commentUrl = await addComment(linted, errors)
			}
		}

		return results

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