'use strict'
const fs = require('fs')

let gitignore = []

fs.readFileSync('./.gitignore', 'utf8').split('\n').forEach((g) => {
	const file = (g[g.length-1] === '/')
		? g.split('/').slice(0,-1).join('/')
		: g
	gitignore.push(file)
})

return gitignore
