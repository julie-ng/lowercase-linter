'use strict'

/**
 * unused right now
 */
const commentInro = `
### Error: Mixed case filenames found

This can cause problems because git and Linux are case sensistive. Please rename the following to ***lowercase-with-dashes***:
`
const rename = 'Please rename the files, commit and push again.'

module.exports = {
	commentInro,
	rename
}