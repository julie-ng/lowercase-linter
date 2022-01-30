'use strict'
const { _ } = require('./../util')
const { alwaysValid } = require('./../linter/exceptions')

/**
 * Raw string helpers (no business logic)
 */

function hasLower (str) {
	return (/[a-z]/.test(str))
}

function hasUpper (str) {
	return (/[A-Z]/.test(str))
}

function hasLowerExt (filename) {
  const ext = _.last(filename.split('.'))
  return hasUpper(ext) === false
}

function toKebab (v) {
  if (v.toUpperCase() === v && hasLower(v) === false) {
    return v
  }

  let ret = '', prevLowercase = false, prevIsNumber = false
  for (let s of v) {
    const isUppercase = s.toUpperCase() === s
    const isNumber = !isNaN(s)
		const isPartOfFilename = s === '.' || s === '/'

    if (isNumber) {
      if (prevLowercase) {
        ret += '-'
      }
    } else {
      if (isUppercase && !isPartOfFilename && (prevLowercase || prevIsNumber)) {
        ret += '-'
      }
    }
    ret += s
    prevLowercase = !isUppercase
    prevIsNumber = isNumber
  }
  return ret.replace(/-+/g, '-').toLowerCase()
}

function hasMixed (path) {
  const toCheck = path.includes('/')
    ? _.last(path.split('/'))
    : path

	const isMixed = hasLower(toCheck) && hasUpper(toCheck)
	return isMixed && !_isException(toCheck)
}

function _isException (str) {
	const filename = str.includes('/')
    ? _.last(str.split('/'))
    : str
  return alwaysValid.includes(filename) === true
}

module.exports = {
	toKebab,
  hasUpper,
  hasLower,
	hasLowerExt,
  hasMixed,
  _isException
}