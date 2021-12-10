const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateEarnPoints = [

    check('id')
    .exists()
    .withMessage('id MISSING')
    .not()
    .isEmpty()
    .withMessage('id IS_EMPTY'),

    check('earnPoints')
    .exists()
    .withMessage('earnPoints MISSING')
    .not()
    .isEmpty()
    .withMessage('earnPoints IS_EMPTY'),

    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateEarnPoints }
