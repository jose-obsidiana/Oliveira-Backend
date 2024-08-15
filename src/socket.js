// socket.js
const { Server } = require('socket.io');
const fs = require('fs');
const ProductManager = require('./managers/productsManagers.js'); // Asegúrate de que esta ruta sea correcta

const productManager = new ProductManager('./dbJson/products.json');
let io;

function initializeSocket(server) {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Nuevo usuario conectado');

        productManager.getProducts().then((result) => {
            socket.emit('listaProducts', result);
        });

        socket.on('nuevoProducto', async (data) => {
            try {
                await productManager.addProduct(data.title, data.category, data.description, data.price, data.file, data.stock);
                const updatedProducts = await productManager.getProducts();
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
