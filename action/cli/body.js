// 'use strict'

// const suggestFix = require( './../linter/suggestion' )

// const formatBody = function (errors) {
// 	const cliBody = []
// 	const commentBody = [commentInro]

// 	errors.forEach((name) => {
// 		const sugg = suggestFix(name.path)
// 		name.suggestedFix = sugg.fullpath
// 		body.push({
// 			path: name.path,
// 			suggestedFix: sugg.fullpath,
// 			isDirectory: name.isDirectory,
// 			isValid: name.isValid,
// 			hasMixedCase: name.hasMixedCase
// 		})

// 		cliBody.push(`  ${ui.errorIcon} ` + sugg.asText)
// 		body.push(`  ${ui.errorIcon} ${sugg.original.fullPath}  ==>  ${sugg.fullpath}`)
// 	})

// 	return {
// 		toCLI: cliBody.join('\n'),
// 		toCommentBody: commentBody.join('\n')
// 	}
// }

// module.exports = formatBody