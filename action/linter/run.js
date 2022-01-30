'use strict'

const fs = require('fs')
const checkPath = require('./check-path')
const ui = require('./../cli')

/**
 * Recursively Lints a Path for mixed cases
 *
 * @param {*} opts
 * @param {String} opts.path - path to lint, can be file or directory
 * @param {Boolean} [opts.output=true] - outputs each file check result to console log
 * @param {Array} results
 * @returns {Object}
 * @returns {String} results.checkedPath
 * @returns {String} results.suggestedPpath
 * @returns {Boolean} results.isDirectory
 * @returns {Boolean} results.isValid
 */
const lint = function (opts = {}, results = []) {
	if (!opts.path) {
		throw `Linter Error: 'path' is a required param.`
	}
	const dir = opts.path
	const logOutput = opts.output || true

	fs.readdirSync(dir).forEach(f => {
		const r = checkPath(dir, f)
		results.push(r)

		if (logOutput) {
			ui.cli.results.printLine(r.checkedPath, r.isValid)
		}

		if (r.shouldDeepCheck) {
			lint({ path: r.checkedPath }, results)
		}
	})

	// remove internal params before returning
	const filtered = []
	results.forEach((r) => {
		delete r.shouldDeepCheck
		delete r.hasMixedCase
		filtered.push(r)
	})
	return filtered
}

module.exports = lint