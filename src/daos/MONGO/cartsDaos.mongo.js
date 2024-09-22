const cartModel = require('../../models/cartsModel.js')
const mongoose = require('mongoose');
const productModel = require('../../models/productModel.js');


class CartDaosMongo {
    constructor() {
        this.model = cartModel
    }



    getCartById = async (id) => {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new Error('ID no válido');
            }
            console.log('ID recibido en daos:', id);
            const cart = await this.model.findById(id).populate('products.product');
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            return cart;
        } catch (error) {
            console.log('No se puede obtener el carrito seleccionado', error);
            throw new Error('Error al obtener el carrito');
        }
    };



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

        console.log('Carrito obtenido:', JSON.stringify(cartMongo, null, 2));

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





    updatedProductToCart = async ({ cartId, productId, quantityChange }) => {

        try {
            const cart = await cartModel.findById(cartId)
            if (!cart) {
                throw new Error('Carrito no encontrado')
            }

            const product = cart.products.find(prod => prod.product._id.toString() === productId.toString())
            if (!product) {
                throw new Error('No se encuentra el producto que quiere actualizar')
            }

            product.quantity += quantityChange
            if (product.quantity < 1) {
                product.quantity = 1
            }

            await cart.save()
            return cart
        } catch (error) {
            throw new Error('Error al actualizar producto', error)
        }

    }


    deleteProductToCart = async ({ cartId, productId }) => {
        try {

            const cartMongo = await cartModel.findById(cartId);
            if (!cartMongo) {
                console.log('No se encuentra el carrito');
                throw new Error('No se encuentra el carrito al que quiere acceder');
            }

            if (!mongoose.isValidObjectId(productId)) {
                throw new Error('El ID del producto no es válido');
            }

            console.log('Carrito encontrado:', cartMongo);
            console.log('ID del producto recibido:', productId);

            const productIndex = cartMongo.products.findIndex(item =>
                item.product._id.toString() === productId.toString() // Comparar con el productId correctamente
            );

            if (productIndex === -1) {
                console.log('Producto no encontrado en el carrito');
                throw new Error('No se encuentra el producto que desea eliminar');
            }

            cartMongo.products.splice(productIndex, 1);
            const updatedCart = await cartMongo.save();
            console.log('Carrito actualizado: producto eliminado con exito');
            return updatedCart;

        } catch (error) {
            console.error('Error en deleteProductToCart:', error);
            throw error;
        }
    }

}

module.exports = CartDaosMongo