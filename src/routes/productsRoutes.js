const { Router } = require("express");
const ProductManager = require('../managers/productsManagers.js')

const router = Router();
const productos = new ProductManager('./products.json')



router.get('/', async (req, res) => {
    try {
        const mostrarLista = await productos.getProducts();
        res.send({ status: 'success', data: mostrarLista })
    } catch (error) {
        console.log('Productos no encontrados', error);
    }

});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const mostrarProducto = await productos.getProductById(pid)
        console.log(mostrarProducto);
        res.send({ status: 'success', data: mostrarProducto })
    } catch (error) {
        console.log('Error al buscar producto', error);
    }
})


router.post('/', async (req, res) => {

    const { title, category, description, price, thumbnail, stock } = req.body;
    console.log(req.body);
    try {
        const agregarProductos = await productos.addProduct(title, category, description, price, thumbnail, stock);
        res.send({ status: 'success', data: agregarProductos })
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'Error al agregar el producto' });
        return console.log('Error al agregar productos:', error);
    }
})


router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const newDetails = req.body
    try {
        const actualizarProducto = await productos.updateProductById(Number(pid), newDetails);
        res.send({ status: 'success', data: actualizarProducto });
    }
    catch (error) {
        return console.log('Error al actualizar productos.', error);
    }
});

router.delete('/:pid', async (req, res) => {

    const { pid } = req.params
    try {
        const borrarProducto = await productos.deleteProduct(Number(pid))
        res.send({ status: 'success', data: borrarProducto })
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'Error al borrar el producto' });

    }
})

module.exports = router;