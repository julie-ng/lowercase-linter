'use strict'

const core = require('@actions/core')
const linter = require('./action/')

try {
  // user inputs
  const path = core.getInput('path')

  // run linter last - in case it fails
	const results = linter.run({ path: path })

  if (results.errors.length > 0) {
    core.setOutput('errors', JSON.stringify(err.invalidNames))
    core.setOutput('suggestion', err.body)
    core.setFailed(err.message)
  } else {
    core.setOutput('errors', '[]')
    core.setOutput('suggestion', '')
  }
} catch (err) {
  console.log(err)
  process.exit(1)
}
