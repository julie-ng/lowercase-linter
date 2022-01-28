const exceptions = [
	'README.md',
	'CODEOWNERS'
]


function hasMixedCase (str) {
	const isMixed = hasLowerCase(str) && hasUpperCase (str)
	const parts = str.split('/')
	const filename = parts[parts.length-1]

	// console.log(parts)

	// console.log(`${str} has exception?`, exceptions.includes(filename))

	return isMixed && !exceptions.includes(filename)
}

function hasLowerCase (str) {
	return (/[a-z]/.test(str))
}

function hasUpperCase (str) {
	return (/[A-Z]/.test(str))
}

module.exports = {
	hasMixed: hasMixedCase
}