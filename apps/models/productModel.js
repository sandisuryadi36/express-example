const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    image_url: {
        type: String,
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product