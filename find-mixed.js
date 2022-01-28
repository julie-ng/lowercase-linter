const fs = require('fs')
const path = require('path')
const colors = require('./util/colors')
const caseHelper = require('./util/case')

const findMixed = function (dir, results = []) {
	try {
		const files = fs.readdirSync(dir)

		files.forEach(f => {
			const fullPath = path.join(dir, f)
			stats = fs.lstatSync(fullPath)
			const isMixed = caseHelper.hasMixed(fullPath)

			results.push({
				path: fullPath,
				isValid: isMixed === false
			})

			if (isMixed) {
				console.log(' ' + colors.red('ⅹ') + ' ' + fullPath)
			} else {
				console.log(' ' + colors.green('✔') + ' ' + fullPath)
			}

			if (stats.isDirectory()) {
				findMixed(fullPath, results)
			}
		})
	} catch (err) {
		console.log(err)
	}

	return results
}


module.exports = findMixed