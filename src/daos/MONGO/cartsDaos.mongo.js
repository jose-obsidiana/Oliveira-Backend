const cartModel = require('../../models/cartsModel.js')
const mongoose = require('mongoose');
const productModel = require('../../models/productModel.js');


class CartDaosMongo {
    constructor() {
        this.model = cartModel
    }


    getCartById = async (id) => {
        try {
            //const cart = await this.model.findOne({ _id: id });
            const cart = await this.model.findById(id).populate('products.product');

            return cart
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



    createProductToCart = async (cartId, productId, quantity) => {

        const cartMongo = await cartModel.findById(cartId);
        if (!cartMongo) {
            throw new Error('No se encuentra el carrito al que quiere acceder');
        }

        if (!mongoose.isValidObjectId(productId)) {
            throw new Error('El ID del producto no es válido');
        }

        const existProduct = cartMongo.products.find(item => item.product._id.toString() === productId.toString());

        const validQuantity = Number(quantity);
        if (isNaN(validQuantity) || validQuantity <= 0) {
            throw new Error('La cantidad proporcionada no es válida');
        }

        if (existProduct) {
            existProduct.quantity += validQuantity;
        } else {
            cartMongo.products.push({ product: productId, quantity: validQuantity });
        }

        const updatedCart = await cartMongo.save();
        return updatedCart;
    };





    // updatedCart = async (id, _id, quantity) => {
    //     const cartMongo = await this.getCartById(id)

    //     if (!cartMongo) {
    //         throw new Error('No se encuentra el carrito al que quiere acceder')
    //     }

    //     const productId = _id.toString();
    //     const existProduct = cartMongo.products.find(prod => prod.product && prod.product.toString() === productId);
    //     if (existProduct) {
    //         existProduct.quantity = +quantity;
    //     }
    //     else {
    //         cartMongo.products.push({ product: _id, quantity: +quantity })
    //     }

    //     const updateCart = await this.model.findByIdAndUpdate(id, { products: cartMongo.products }, { new: true })
    //     return updateCart
    // }


    deleteProductToCart = async (cartId, productId) => {
        const cart = await cartModel.findById(cartId)

        try {
            if (!cart) {
                return console.log('No se encuentra el carrito al que desea acceder')
            }

            const productIndex = cart.products.findIndex(item => item.product._id.equals(productId));

            if (productIndex === -1) {
                throw new Error('No se encuentra el producto que desea eliminar');
            }

            cart.products.splice(productIndex, 1)
            const resultado = await cart.save()
            return resultado
        } catch (error) {
            console.log('Error al intentar eliminar producto:', error)
        }

    }
}

module.exports = CartDaosMongo