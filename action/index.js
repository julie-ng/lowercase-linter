'use strict'

const fs = require('fs')
const path = require('path')
const colors = require('./ui/colors')
const caseHelper = require('./util/case')

const ALWAYS_SKIP = [
	'.git',
	'node_modules'
]

const linter = function (opts = {}, results = []) {
	const dir = opts.path
	const ignore = opts.ignore || []

	// console.log('dir', dir)
	// console.log('ignore', ignore)
	// console.log(fs.readdirSync(dir))

	try {

		const files = fs.readdirSync(dir)

		files.forEach(f => {
			const fullpath = path.join(dir, f)

			if (!ignore.includes(fullpath) && !ALWAYS_SKIP.includes(f)) {
				const stats = fs.lstatSync(fullpath)

				// checkPath()
				const check = lintName(fullpath)
				logStatus(check)
				results.push(check)
				if (stats.isDirectory()) {
					linter({ path: fullpath }, results)
				}
			}
		})


	} catch (err) {
		console.log(err)
	}

	return results
}


const lintName = function (path) {
	return {
		path: path,
		isValid: caseHelper.hasMixed(path) === false
	}
}

const logStatus = function (file) {
	const icon = file.isValid
		? colors.green('✔')
		: colors.red('ⅹ')

	console.log(' ' + icon + ' ' + file.path)
}

module.exports = {
	findMixed: linter
}