const express = require('express')
const router = express.Router()


const trimRequest = require('trim-request')

const {
  createUser,
  redeemPoints,
  earnPoints,
  transaction
} = require('../controllers/rewardsPoint')


const {validateEarnPoints,validateRedeemPoints,validateTransaction}= require('../controllers/rewardsPoint/validator')

/** Rewards routes **/

/*
 * mobileOTP route
 */
router.post(
  '/createUser',
  trimRequest.all,
  createUser
)

router.post(
  '/earnPoints',
  trimRequest.all,
  validateEarnPoints,
  earnPoints
)

router.post(
  '/redeemPoints',
  trimRequest.all,
  validateRedeemPoints,
  redeemPoints
)

router.post(
  '/transaction',
  trimRequest.all,
  validateTransaction,
  transaction
)

module.exports = router