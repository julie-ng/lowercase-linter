'use strict'

const fs = require('fs')
const filecheck = require('./filecheck')

const lint = function (opts = {}, results = []) {
	const dir = opts.path
	try {
		fs.readdirSync(dir).forEach(f => {
			const r = filecheck(dir, f)
			results.push(r)
			console.log(r.toStr)
			if (r.shouldDeepCheck) {
				lint({ path: r.path }, results)
			}
		})
	} catch (err) {
		console.log(err)
	}

	return results
}

module.exports = lint