// app.js
const express = require('express');
const handlebars = require('express-handlebars');
const uploader = require('./utils/multer.js');
const path = require('path');
const { initializeSocket } = require('./socket.js');
const connectDB = require('./config/index.js')
const appRouter = require('./routes/index.js')


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));  // Agrega una ruta para dar seguridad a la carpeta public

app.use(appRouter)


// Configuración del motor de plantillas Handlebars
// motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// userModel
connectDB()

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



const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`);
});

// Inicializa Socket.io
initializeSocket(httpServer);

module.exports = { app }; //  exporta la app
