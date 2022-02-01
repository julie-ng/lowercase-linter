'use strict'

function errorsToTable (errors) {
	const body = []
	body.push('| Actual Path | | Suggested Valid Path |')
	body.push('|:--|:--|:--|')
	errors.forEach((e) => {
		const tableRow = '| ❌ `' + e.checkedPath + '` | **→** | `' + e.suggestedPath + '` |'
		body.push(tableRow)
	})
	return body.join('\n')
}

module.exports = {
	errorsToTable,
}