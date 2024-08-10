const express = require('express');
const handlebars = require('express-handlebars');
const uploader = require('./utils/multer.js');
const path = require('path');

const productsRoutes = require('./routes/productsRoutes.js')
const cartsRoutes = require('./routes/cartsRoutes.js')
const viewsRoutes = require('./routes/viewsRoutes.js')




const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));  // agrego una ruta para dar seguridad a la carpeta public

// configuracion del motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
//configurar las carpetas de donde se deben extraer las plantillas
app.set('views', __dirname + '/views')
//configurar la extension que tienen las plantillas
app.set('view engine', 'handlebars')

// multer
app.post('/', uploader.single('myFile'), (req, res) => {
    res.send('archivo subido')
})

//endpoints
app.use('/', viewsRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)





app.listen(PORT, () => {
    console.log("Escuchando en puerto 8080");
})