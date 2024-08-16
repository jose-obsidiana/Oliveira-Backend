// app.js
const express = require('express');
const handlebars = require('express-handlebars');
const uploader = require('./utils/multer.js');
const path = require('path');
const { initializeSocket } = require('./socket.js');

const productsRoutes = require('./routes/productsRoutes.js');
const cartsRoutes = require('./routes/cartsRoutes.js');
const viewsRoutes = require('./routes/viewsRoutes.js');
const realTimeProducts = require('./routes/realTimeProducts.js');

const ProductManager = require('./managers/productsManagers.js');
const productManager = new ProductManager('./dbJson/products.json');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));  // Agrega una ruta para dar seguridad a la carpeta public

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views')); // Usa path.join para mayor consistencia
app.set('view engine', 'handlebars');

// Multer
app.post('/upload', uploader.single('myFile'), (req, res) => {
    if (req.file) {
        const filePath = `/static/assets/img/${req.file.filename}`;
        console.log('Archivo subido con éxito');
        res.json({ file: filePath, message: 'Archivo subido con éxito' });
    } else {
        res.status(400).send('Error al subir el archivo');
    }
});

// Endpoints
app.use('/', viewsRoutes);
app.use('/realtimeproducts', realTimeProducts);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`);
});

// Inicializa Socket.io
initializeSocket(httpServer);

module.exports = { app }; //  exporta la app
