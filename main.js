'use strict'

const core = require('@actions/core')
const linter = require('./action/')

try {
  const path = core.getInput('path')
	const results = linter.run({ path: path })

  if (results.errors.length > 0) {
    core.setOutput('errors', JSON.stringify(results.errors))
    core.setOutput('suggestions', results.results)
    core.setOutput('comment-url', results.commentUrl)
    process.exit(1)
  } else {
    core.setOutput('errors', '[]')
    core.setOutput('suggestions', '')
    core.setOutput('comment-url', '')
  }
} catch (err) {
  console.log(err)
  process.exit(1)
}
