const { Schema, model } = require('mongoose')

const cartCollection = 'carts'

const cartSchema = new Schema({
    // userID
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products' // referencia de la coleccion de productos
            },
            quantity: {
                type: Number
            }
        }]
    }
})

// modifico mi schema para utilizar populations, funciona solo con el find y el findOne, 
//le paso un metodo como argumento y un callback
cartSchema.pre('findOne', function () {
    this.populate('products.product')
})


const cartModel = model(cartCollection, cartSchema)
module.exports = cartModel