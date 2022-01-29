'use strict'

const core = require('@actions/core')
// const github = require('@actions/github')
const linter = require('./action/')

try {
  // user inputs
  const path = core.getInput('path')

  // action payload & outputs
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`)
  const time = (new Date()).toTimeString()
  core.setOutput('time', time)

  // run linter last - in case it fails
	linter.run({ path: path })
  core.setOutput('errors', '[]')
  core.setOutput('suggestion', '')
} catch (err) {
  core.setOutput('errors', JSON.stringify(err.invalidNames))
  core.setOutput('suggestion', err.body)
  core.setFailed(err.message)
  // console.log(err)
  process.exit(1)
}
