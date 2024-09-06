const cartModel = require('../../models/cartsModel.js')
const mongoose = require('mongoose')


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

    createProductToCart = async (id, _id, quantity) => {
        // Obtén el carrito por su ID
        const cartMongo = await this.getCartById(id);

        if (!cartMongo) {
            throw new Error('No se encuentra el carrito al que quiere acceder');
        }

        const productId = _id.toString();
        // Encuentra el producto en el carrito
        const existProduct = cartMongo.products.find(prod => prod.product && prod.product.toString() === productId);
        if (existProduct) {
            // Si el producto ya existe, actualiza su cantidad
            existProduct.quantity += +quantity;
        } else {
            // Si el producto no existe, agrégalo al carrito con la cantidad
            cartMongo.products.push({ product: _id, quantity: +quantity });
        }

        // Actualiza el carrito en la base de datos
        const updateCart = await this.model.findByIdAndUpdate(id, { products: cartMongo.products }, { new: true });
        return updateCart;
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


    deleteCart = async () => { }

}

module.exports = CartDaosMongo