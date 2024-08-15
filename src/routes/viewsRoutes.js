const { Router } = require("express")
const ProductManager = require('../managers/productsManagers.js')

const router = Router();

const products = new ProductManager('./dbJson/products.json')



router.get('/', async (req, res) => {

    const userLogin = {
        full_name: 'Jose Oliveira',
        role: 'admin'
    }

    try {
        const mostrarLista = await products.getProducts();
        if (!mostrarLista) {
            res.status(400).send({ status: 'error', message: 'Error al obtener los productos' });
        }
        res.render('home', {
            title: 'Home',
            style: 'index.css',
            user: userLogin,
            isAdmin: userLogin.role === 'admin',
            mostrarLista
        })
    } catch (error) {
        console.log('Productos no encontrados', error);
        res.status(500).send({ status: 'error', message: 'Productos no encontrados' });
    }

})





module.exports = router