'use strict'

const fs = require('fs')
const linter = require('./action/')
const ui = require('./action/ui')

let gitignore = []

fs.readFileSync('./.gitignore', 'utf8').split('\n').forEach((g) => {
	const file = (g[g.length-1] === '/')
		? g.split('/').slice(0,-1).join('/')
		: g
	gitignore.push(file)
})
// console.log(gitignore)

ui.headings.startingCheck()

const mixed = linter.findMixed({
	path: '.', //path: 'fixtures/',
	ignore: gitignore
})

const errors = mixed.filter((m) => m.isValid === false)

if (errors.length > 0) {
	ui.outputErrors(errors)
}
