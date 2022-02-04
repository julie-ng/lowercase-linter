'use strict'

// lazy lodash
const _ = {
  last: function (arry) {
    return (arry.length > 0) ? arry[arry.length-1] : 0
  }
}

module.exports = {
  _
}
