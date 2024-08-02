const fs = require("fs");


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

    createProductCart = async (cartId, productId, quantity) => {
        try {
            const carts = await this.getCart();
            const cart = carts.find(cart => cart.id === Number(cartId));

            if (!cart) {
                console.log('Carrito no encontrado');
                return null;
            }

            const existProduct = cart.products.find(prod => prod.productId === Number(productId))

            if (existProduct) {
                existProduct.quantity += quantity
            }
            else {
                const product = {
                    productId: productId,
                    quantity: quantity
                };
                cart.products.push(product);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts), 'utf-8');
            console.log('Producto añadido al carrito correctamente');
            return cart;

        } catch (error) {
            console.log('Error al agregar producto al carrito', error);
            return null;
        }
    }
}




const cartManager = new CartManager('./carts.json')




module.exports = CartManager