'use strict'

const linter = require('./action/')

const toLint = 'fixtures/'

try {
	const results = linter.run({ path: toLint })
	if (results.errors && results.errors.length > 0) {
		console.log(results.errors)
		process.exit(1)
	}
} catch (err) {
	console.log('Error running linter.')
	console.log(err)
}

