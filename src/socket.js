// socket.js
const { Server } = require('socket.io');
const ProductDaosMongo = require('./daos/MONGO/productsDaos.mongo');
const CartDaosMongo = require('./daos/MONGO/cartsDaos.mongo')

const productService = new ProductDaosMongo()
const cartService = new CartDaosMongo()

let io;

function initializeSocket(server) {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Nuevo usuario conectado');

        // realtime
        productService.getProducts().then((result) => {
            socket.emit('listaProducts', result);
        });

        socket.on('nuevoProducto', async (data) => {
            try {
                await productService.createProduct(data.title, data.category, data.description, data.price, data.file, data.stock, data.code, data._id);
                const updatedProducts = await productService.getProducts();
                io.emit('listaProducts', updatedProducts);
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        });

        socket.on('deletedProduct', async (productId) => {
            try {
                await productService.deleteProduct(productId)
                const result = await productService.getProducts()
                io.emit('updatedCart', result)
            } catch (error) {
                console.error('Error al eliminar producto:', error);

            }
        })


        // cart
        socket.on('getCartById', async (cartId) => {
            if (!cartId) {
                console.error('No se recibió un cartId válido');
                socket.emit('error', 'El ID del carrito no es válido');
                return;
            }

            try {
                console.log('recibiendo el cartId desde socket', cartId)
                const cart = await cartService.getCartById(cartId);
                socket.emit('listaProductFromCart', { products: cart.products });
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
                socket.emit('error', 'Error al obtener el carrito');
            }
        });

        socket.on('deletedProductFromCart', async ({ cartId, productId }) => {

            try {
                await cartService.deleteProductToCart({ cartId, productId })
                const result = await cartService.getCartById(cartId)
                if (result) {
                    socket.emit('updatedProductsFromCart', result)
                }
            } catch (error) {
                socket.emit('error', 'Error al eliminar producto', error);
            }
        })


        socket.on('updateProductQuantity', async ({ cartId, productId, quantityChange }) => {
            console.log('Recibido en el servidor:', { cartId, productId, quantityChange });
            if (!cartId || !productId || !quantityChange) {
                console.log('Parámetros faltantes o inválidos', { cartId, productId, quantityChange });
                socket.emit('error', 'Parámetros faltantes o inválidos');
                return;
            }
            try {
                await cartService.updatedProductToCart({ cartId, productId, quantityChange })
                const result = await cartService.getCartById(cartId)
                if (!result) {
                    console.log('Error al intentar actualizar carrito')
                }
                socket.emit('productQuantityUpdated', result)
                console.log('cantidad actualizada correctamente', result)

            } catch (error) {
                socket.emit('error', 'Error al actualizar cantidad')
            }
        })

    });
}

function getIo() {
    if (!io) {
        throw new Error('Socket.io no está inicializado');
    }
    return io;
}

module.exports = { initializeSocket, getIo };


