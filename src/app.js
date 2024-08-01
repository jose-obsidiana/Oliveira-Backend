const express = require('express');
const productsRoutes = require('./routes/productsRoutes.js')
const cartsRoutes = require('./routes/cartsRoutes.js')


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)






app.listen(PORT, () => {
    console.log("Escuchando en puerto 8080");
})