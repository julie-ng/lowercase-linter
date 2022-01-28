'use strict'

const findMixed = require('./find-mixed')
const ui = require('./util/ui')

ui.startingCheck()

// const mixed = findMixed('fixtures/')
const errors = mixed.filter((m) => m.isValid === false)

if (errors.length > 0) {
	ui.prettyErrors(errors)
}
