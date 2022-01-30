'use strict'

const core = require('@actions/core')
const linter = require('./action/')

try {
  // user inputs
  const path = core.getInput('path')

  // run linter last - in case it fails
	const results = linter.run({ path: path })

  if (results.errors.length > 0) {
    core.setOutput('errors', JSON.stringify(results.errors))
    core.setOutput('suggestions', results.results)
    // core.setFailed(err.message)
    process.exit(1)
  } else {
    core.setOutput('errors', '[]')
    core.setOutput('suggestions', '')
  }
} catch (err) {
  console.log(err)
  process.exit(1)
}
