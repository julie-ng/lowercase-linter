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
// function run (opts = {}) {
	const toLint = opts.path || '.'
	ui.cli.print('start', { path: toLint })

	console.log('Hello - change to trigger Workflow run. Remember to do ncc builds too!')

	try {
		const results = lint({ path: toLint })
		// console.log(results)
		const errors = results.filter((m) => m.isValid === false)
		let commentUrl = ''

		if (errors.length > 0) {
			// console.log(errors)
			ui.cli.print('suggestions', { errors: errors })
			const token = core.getInput('repo-token')
			if (token === '') {
				throw 'Missing GitHub token to post comment to Pull Request'
			} else {
				commentUrl = await postErrorsToPullRequest(errors)
				console.log('Added')
			}
		} else {
			ui.cli.print('success')
		}

		return {
			errors,
			all: results,
			commentUrl
		}
	} catch (err) {
		console.error('Could not lint path')
		console.error(err)
		process.exit(1)
	}

	return 'hello world'
}

module.exports = {
	run: run
}