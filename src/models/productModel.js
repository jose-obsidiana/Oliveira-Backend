const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2')


const productCollection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    category: {
        type: String,
        required: true,
        index: true
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
    file: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        default: Date.now
    }

})

productSchema.plugin(mongoosePaginate)

const productModel = model(productCollection, productSchema)
module.exports = productModel