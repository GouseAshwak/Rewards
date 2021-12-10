const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateRedeemPoints = [

    check('id')
    .exists()
    .withMessage('id MISSING')
    .not()
    .isEmpty()
    .withMessage('id IS_EMPTY'),

    check('redeemPoints')
    .exists()
    .withMessage('redeemPoints MISSING')
    .not()
    .isEmpty()
    .withMessage('redeemPoints IS_EMPTY'),

    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateRedeemPoints }
