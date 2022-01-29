'use strict'

const colors = require('./colors')

function printStart (opts = { path: '' }) {
	const toSearch = opts.path
		? colors.yellow(' in ') + colors.cyan(opts.path)
		: ''
	console.log('')
	console.log(colors.yellow('Checking filenames'.toUpperCase()) + toSearch)
}

function printErrorIntro (opts = { count: '' }) {
	console.log('')
	console.log(colors.red(`ERRORS FOUND: ${opts.count}`))
	console.log('Mixed case filenames can cause problems when collaborating via git')
	console.log('because filenames are case in-sensitive Windows but sensistive in Linux.')
	console.log('')
	console.log(`Please rename the following ${colors.cyan('lowercase and use dashes')} per`)
	console.log('open source community best practices.')
	console.log('')
}

function printErrorClosing () {
	console.log('')
	console.log('Please rename your files, commit and push again before merging.')
	console.log('')
}

function printSuccess () {
	console.log()
	console.log(colors.green('👍 Success - no mixed case filenames found.'))
}

module.exports = {
	printStart,
	printErrorIntro,
	printErrorClosing,
	printSuccess
}