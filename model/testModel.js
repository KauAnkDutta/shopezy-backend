const mongoose = require('mongoose')

const testCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    products:[
        {
            type: Object,
            default: {}
        }
    ],
},{
    timestamps: true,
})

module.exports = mongoose.model("testCart", testCartSchema)