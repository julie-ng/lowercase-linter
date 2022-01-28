'use strict'
const exceptions = require('./exceptions').default

// lazy lodash
const _ = {
  last: function (arry) {
    return arry[arry.length-1]
  }
}

function _isExtensionLowerCase (filename) {
  const ext = _.last(filename.split('.'))
  return _hasUpperCase(ext) === false
}

function hasMixedCase (path) {
  const toCheck = path.includes('/')
    ? _.last(path.split('/'))
    : path

	const isMixed = _hasLowerCase(toCheck) && _hasUpperCase(toCheck)
	return isMixed && !_isException(toCheck)
}

function _isException (str) {
	const filename = str.includes('/')
    ? _.last(str.split('/'))
    : str
  return exceptions.includes(filename) === true
}

function _hasLowerCase (str) {
	return (/[a-z]/.test(str))
}

function _hasUpperCase (str) {
	return (/[A-Z]/.test(str))
}

function camelCaseToDash (v) {
  if (v.toUpperCase() === v && _hasLowerCase(v) === false) {
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

// Exports
// -------

module.exports = {
	hasMixed: hasMixedCase,
	camelCaseToDash: camelCaseToDash,
  _hasUpperCase: _hasUpperCase,
  _hasLowerCase: _hasLowerCase,
  _isException: _isException,
  _isExtensionLowerCase: _isExtensionLowerCase
}