const express = require('express')
const auth = require('../Middleware/auth')
const { processPayment, SendStripeApiKey } = require('../Controller/Payment')
const router = express.Router()

router.post("/payment/process", auth, processPayment)
router.get("/stripeapikey", auth, SendStripeApiKey)
module.exports = router