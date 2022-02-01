'use strict'

const linter = require('./action/')
const colors = require('./action/cli/colors')

const failingPath = 'fixtures/'
const passingPath = 'fixtures/always-passing'

async function run() {
	const code1 = await _testFixtures(passingPath, true)
	const code2 = await _testFixtures(failingPath, false)
	if (code1 + code2 !== 0) {
		process.exit(1)
	}
	// console.log('code1', code1)
}

run()

async function _testFixtures(path, expectPass) {
	let exitCode = 0
	let msg = ''

	try {
		const results = await linter.run({ path: path })
		const hasErrors = _hasErrors(results)


		if (hasErrors && expectPass === true) {
			msg = '🔴 Errors were found, but fixtures were expected to pass.'
			exitCode = 1
		}

		if (hasErrors && expectPass === false) {
			msg = '🟢 Errors were found - as expected.'
			exitCode = 0
		}

		if (!hasErrors && expectPass === true) {
			msg = '🟢 No errors were found - as expected.'
			exitCode = 0
		}

		if (!hasErrors && expectPass === false) {
			msg = '🔴 No errors were found, but fixtures were expected to fail.'
			exitCode = 1
		}

		_log('============================================', exitCode)
		_log(msg, exitCode)
		_log('============================================', exitCode)


	} catch (err) {
		console.log('👾 Error running linter. Bug somewhere in code?')
		console.error(err)
		exitCode = 1
	}

	// console.log('🏁 Done')

	return exitCode
}

function _hasErrors (results) {
	return results.errors && results.errors.length > 0
}

function _log (str, exitCode) {
	if (exitCode === 0) {
		console.log(colors.green(str))
	} else {
		console.log(colors.red(str))
	}
}
