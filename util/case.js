'use strict'

// lazy lodash
const _ = {
  last: function (arry) {
    return arry[arry.length-1]
  }
}

// Is Mixed Filename?
// ------------------

const exceptions = [
  'CONTRIBUTING.md',
  'LICENSE.md',
	'README.md'
]

function hasMixedCase (path) {

  const toCheck = path.includes('/')
    ? _.last(path.split('/'))
    : path

	const isMixed = _hasLowerCase(toCheck) && _hasUpperCase(toCheck)
	return isMixed && _notException(toCheck)
}

function _notException (str) {
	const filename = str.includes('/')
    ? _.last(str.split('/'))
    : str
  return exceptions.includes(filename) === false
}

function _hasLowerCase (str) {
	return (/[a-z]/.test(str))
}

function _hasUpperCase (str) {
	return (/[A-Z]/.test(str))
}

// Suggest filename
// ----------------

function camelCaseToDash (v) {
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
	camelCaseToDash: camelCaseToDash
}