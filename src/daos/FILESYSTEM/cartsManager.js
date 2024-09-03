const fs = require("fs");
const ProductManager = require('./productsManagers.js')

const productManager = new ProductManager('./dbJson/products.json')


class CartManager {

    constructor(path) {
        this.path = path;
    }

    getCart = async () => {
        try {
            const resultadoCarts = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(resultadoCarts)
            return carts;
        } catch (error) {
            console.log("Error al leer archivo")
            return [];
        }
    }


    getCartById = async (cartId) => {
        try {
            const carts = await this.getCart()
            const resultado = carts.find(cart => cart.id === Number(cartId))
            if (resultado) {
                return resultado;
            } else {
                console.log('Carrito no encontrado');
                return null;
            }
        } catch (error) {
            return console.log('El carrito buscado no existe');
        }
    }

    createCart = async (products = []) => {

        try {
            const carts = await this.getCart()
            const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

            const cart = {
                id: newId,
                products: products
            }

            carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts), "utf-8")
            console.log('Carrito creado correctamente')
            return cart;
        } catch (error) {
            return console.log("El carrito no ha podido ser creado", error);
        }
    }






    createProductCart = async (cartId, productId) => {
        try {
            const carts = await this.getCart();
            const cart = carts.find(cart => cart.id === Number(cartId));
            const products = await productManager.getProducts()

            if (!cart) {
                console.log('Carrito no encontrado');
                throw new Error;
            }

            const productJson = products.find(prod => prod.id === Number(productId))
            if (!productJson) {
                throw new Error('Error, producto no encontrado en la base de datos')
            }

            const existProduct = cart.products.find(prod => Number(prod.productId) === Number(productId))
            if (existProduct) {
                existProduct.quantity += 1
            }

            else {
                const product = {
                    productId: productId,
                    quantity: 1
                };
                cart.products.push(product);
                console.log('Producto añadido al carrito:', product);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts), 'utf-8');
            return cart;

        } catch (error) {
            console.log('Error al agregar producto al carrito', error);
            throw error;
        }
    }
}





module.exports = CartManager