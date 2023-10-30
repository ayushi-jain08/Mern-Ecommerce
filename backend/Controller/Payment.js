const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const processPayment = async(req,res) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amounts,
        currency: "inr",
        metadata: {
            company: "Ecommerce"
        }
    });
    res.status(200).json({
        success:true,
        client_secret: myPayment.client_secret
    })
}

const SendStripeApiKey = async(req,res) => {
    res.status(200).json({ StripeApikey: process.env.STRIPE_API_KEY })
}
module.exports = {processPayment, SendStripeApiKey}