const cartModel = require('../../models/cartsModel.js')
const mongoose = require('mongoose')


class CartDaosMongo {
    constructor() {
        this.model = cartModel
    }


    getCartById = async (id) => {
        try {
            return await this.model.findOne({ _id: id })
        } catch (error) {
            console.log('No se puede obtener el carrito seleccionado')
            throw new Error;
        }
    }

    createCart = async () => {
        try {
            return await this.model.create({ products: [] })
        } catch (error) {
            console.log('Error al crear carrito')
            throw Error;
        }
    }

    updateCart = async (id, _id, quantity) => {
        const cartMongo = await this.getCartById(id)

        if (!cartMongo) {
            return console.log('No se encuentra el carrito al que quiere acceder')
        }

        const existProduct = cartMongo.products.find(prod => prod.product.toString() === _id)

        if (existProduct) {
            existProduct.quantity = + quantity
        }

        cartMongo.products.push({ product: _id, quantity })
        const updateCart = await this.model.findByIdAndUpdate({ _id: id }, cartMongo)

        return updateCart
    }


    deleteCart = async () => { }

}

module.exports = CartDaosMongo