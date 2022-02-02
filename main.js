'use strict'

const core = require('@actions/core')
const linter = require('./action/')

try {
  const path = core.getInput('path')
	const results = linter.run({ path: path })
  core.setOutput('linted', results.all)
  console.log('results')
  console.log(results)

  if (results.errors && results.errors.length > 0) {
    core.setOutput('errors', JSON.stringify(results.errors))
    // core.setOutput('comment-url', results.commentUrl)
    core.setOutput('comment-url', 'Should have errors here in failing case')
    process.exit(1)
  } else {
    core.setOutput('errors', '[]')
    core.setOutput('comment-url', '')
  }
} catch (err) {
  console.log(err)
  process.exit(1)
}
