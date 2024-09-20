// socket.js
const { Server } = require('socket.io');
const fs = require('fs');
const ProductDaosMongo = require('./daos/MONGO/productsDaos.mongo'); // Asegúrate de que esta ruta sea correcta

const productService = new ProductDaosMongo()

let io;

function initializeSocket(server) {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Nuevo usuario conectado');

        productService.getProducts().then((result) => {
            socket.emit('listaProducts', result);
        });

        // create prod
        socket.on('nuevoProducto', async (data) => {
            try {
                await productService.createProduct(data.title, data.category, data.description, data.price, data.file, data.stock, data.code, data._id);
                const updatedProducts = await productService.getProducts();
                io.emit('listaProducts', updatedProducts);
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        });


        //delete prod
        socket.on('deletedProduct', async (productId) => {
            try {
                await productService.deleteProduct(productId)
                const result = await productService.getProducts()
                io.emit('updatedCart', result)
            } catch (error) {
                console.error('Error al eliminar producto:', error);

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
