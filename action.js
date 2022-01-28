'use strict'

const findMixed = require('./action/')
const ui = require('./action/ui')

ui.headings.startingCheck()

// ui.startingCheck()

const mixed = findMixed('fixtures/')
const errors = mixed.filter((m) => m.isValid === false)

if (errors.length > 0) {
	ui.outputErrors(errors)
}
