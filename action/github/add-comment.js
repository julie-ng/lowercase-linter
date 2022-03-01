'use strict'

const github = require('@actions/github')
const core = require('@actions/core')
const messages = require('./messages')
const markdown = require('./markdown')

/**
 * Adds a Comment to Pull Request
 * with list of files that are invalid
 *
 * @param {Array} errors
 * @returns {String} url of the comment, including hash to scroll to that point on page.
 */
const addCommentToPR = async function (errors) {
	const token = core.getInput('repo-token')
	const context = github.context.payload

	if (process.env.CASE_LINTER_DEBUG === 'true') {
		console.log('addCommentToPR()')
		console.log(errors)
		console.log('********************')
		console.log(context)
		console.log('********************')
	}

	const isPullRequest = Object.prototype.hasOwnProperty.call(context, 'pull_request') // && Object.prototype.hasOwnProperty.call(context.pull_request, 'number')

	if (isPullRequest) {
		const octokit = github.getOctokit(token)
		const body = markdownComment(errors)
		const owner = context.repository.owner.login
		const repo_name = context.repository.name
		const issue_number = context.pull_request.number

		const result = await octokit.rest.issues.createComment({
		owner: owner,
		repo: repo_name,
			issue_number,
			body,
		})
		// console.log(result)
		return result.data.html_url
	} else {
		console.log('Nothing to do: not a Pull Request or missing GitHub token.')
	}
}

function markdownComment (errors) {
	const body = []
	const table = markdown.errorsToTable(errors)
	// console.log(table)

	body.push(messages.commentInro)
	body.push(table)
	body.push('')
	body.push(messages.rename)

	return body.join('\n')
}


module.exports = addCommentToPR
