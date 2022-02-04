'use strict'

const core = require('@actions/core')
const linter = require('./action/')

async function run () {
  try {
    const path = core.getInput('path') || process.env.CASE_LINTER_PATH || '.'

    const results = await linter.run({ path: path })
    core.setOutput('linted', results.all)
    // console.log('results')
    // console.log(results)

    if (results.errors && results.errors.length > 0) {
      core.setOutput('errors', JSON.stringify(results.errors))
      core.setOutput('comment-url', results.commentUrl)
      process.exit(1)
    } else {
      core.setOutput('errors', '[]')
      core.setOutput('comment-url', '')
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

run()

