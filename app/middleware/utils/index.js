const { handleError } = require('./handleError')
const { removeExtensionFromFile } = require('./removeExtensionFromFile')
const { buildErrObject } = require('./buildErrObject')
const { validateResult } = require('./validateResult')


module.exports = {
  handleError,
  removeExtensionFromFile,
  buildErrObject,
  validateResult
}
