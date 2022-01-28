const fs = require('fs')
const path = require('path')
const colors = require('./util/colors')
const caseHelper = require('./util/case')

const errorIcon = colors.red('𝗫')
const mixed = findMixed('test/')

console.log('')
console.log('*** MIXED ***', mixed)

function findMixed (dir, mixed = []) {
	try {
		const files = fs.readdirSync(dir)

		files.forEach(f => {
			const fullPath = path.join(dir, f)
			stats = fs.lstatSync(fullPath)

			if (caseHelper.hasMixed(fullPath)) {
				console.log(errorIcon + ' ' + fullPath)
				mixed.push(fullPath)
			}

			if (stats.isDirectory()) {
				findMixed(fullPath, mixed)
			} else {
				console.log(`✔ ${fullPath}`)
			}
		})
	} catch (err) {
		console.log(err)
	}

	return mixed
}
