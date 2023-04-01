const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    products: [
        {   
            id: {
                type: Number,
                required: true
            },

            title: {
                type: String,
                trim: true,
                required: true
            },

            image: {
                type: String,
                trim: true,
                required: true
            },

            price: {
                type: Number,
                trim: true,
                required: true
            },

            quantity: {
                type: Number,
            },

            rating: {
                type:Number
            }
            
        }
    ],
},{
    timestamps: true,
})

module.exports = mongoose.model("cartItems", cartSchema)