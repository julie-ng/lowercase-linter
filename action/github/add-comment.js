'use strict'

const github = require('@actions/github')
const core = require('@actions/core')

// Each workflow run gets an automated token (1) - set in yaml
const token = core.getInput('repo-token')
const octokit = github.getOctokit(token)
const context = github.context.payload
const isPullRequest = true // context.pull_request !== null
const testIssue = '1' // for testing

const addComment = async function (body = '') {
	body = (body === '')
		? 'Testing add comment from GitHub workflow.'
		: body

	if (isPullRequest) {
		const owner = context.repository.owner.login
		const repo_name = context.repository.name
		const issue_number = testIssue // context.pull_request.number

		const result = await octokit.rest.issues.createComment({
		owner: owner,
		repo: repo_name,
			issue_number,
			body,
		})
		console.log(result)
	} else {
		console.log('Not a Pull Request - nothing to do')
	}
}

module.exports = addComment
