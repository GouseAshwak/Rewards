const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateTransaction = [

    check('id')
    .exists()
    .withMessage('id MISSING')
    .not()
    .isEmpty()
    .withMessage('id IS_EMPTY'),
    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateTransaction }
