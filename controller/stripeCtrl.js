const dotenv = require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripeCtrl = {
    acceptPayment : async(req, res) => {
        let {id, amount} = req.body.data
        try {
            const payment = await stripe.paymentIntents.create({
                payment_method: id,
                description: "Test Payment",
                amount: amount * 100,
                currency: 'inr',
                confirmation_method: 'manual',
                confirm: true
            })
            res.json({
                message: "Payment successFul",
                success: true
            })
            
        } catch (error) {
            console.log("Error:", error)
            res.status(500).json({msg: "Payment Failed"})
        }
    }
}

module.exports = stripeCtrl