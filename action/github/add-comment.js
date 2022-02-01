'use strict'

const github = require('@actions/github')
// const core = require('@actions/core')
const messages = require('./messages')
const markdown = require('./markdown')

/**
 * Adds a Comment to Pull Request
 * with list of files that are invalid
 *
 * @param {*} errors
 * @returns {String} url of the comment, including hash to scroll to that point on page.
 */
const addCommentToPR = async function (token, errors) {
	// console.log(errors)
	// const testIssue = '1' // for testing

	const context = github.context.payload
	const isPullRequest = context.pull_request !== null

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
		console.log(result)
		return result.html_url
	} else {
		console.log('Missung GitHub token or not a Pull Request - nothing to do.')
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
