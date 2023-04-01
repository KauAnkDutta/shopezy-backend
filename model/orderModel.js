const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    orders:{
        type: Array,
        required: true
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("orderitems", orderSchema)