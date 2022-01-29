'use strict'

const linter = require('./action/')
const results = linter.run({ path: 'fixtures/' })

console.log(results.errors)