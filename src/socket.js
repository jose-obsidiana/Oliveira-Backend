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

        socket.on('nuevoProducto', async (data) => {
            try {
                await productService.createProduct(data.title, data.category, data.description, data.price, data.file, data.stock);
                const updatedProducts = await productService.getProducts();
                io.emit('listaProducts', updatedProducts);
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        });
    });
}

function getIo() {
    if (!io) {
        throw new Error('Socket.io no está inicializado');
    }
    return io;
}

module.exports = { initializeSocket, getIo };
