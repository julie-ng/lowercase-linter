'use strict'

const linter = require('./action/')

try {
	linter.run({ path: 'fixtures/' })
} catch (err) {
	console.log(JSON.stringify(err.invalidNames))
	console.log(err.body)
	process.exit(1)
}

