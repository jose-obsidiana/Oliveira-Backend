const { Schema, model } = require('mongoose')

const productCollection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        default: Date.now()
    }

})

const productModel = model(productCollection, productSchema)
module.exports = productModel