'use strict'

const linter = require('./action/')

try {
	const results = linter.run({ path: 'fixtures/' })
	if (results.errors.length > 0) {
		process.exit(1)
	}
} catch (err) {
	console.log(JSON.stringify(err.invalidNames))
	console.log(err.body)
	process.exit(1)
}

