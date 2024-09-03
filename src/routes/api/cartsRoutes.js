const { Router } = require("express");
const CartManager = require("../../daos/FILESYSTEM/cartsManager.js");

const router = Router();
const cartManager = new CartManager('./dbJson/carts.json')



router.get('/', async (req, res) => {

    try {
        const getCarts = await cartManager.getCart()
        res.send({ status: 'success', data: getCarts })
    } catch (error) {
        console.log('Carritos no encontrados', error);
    }
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const getCart = await cartManager.getCartById(cid)
        if (!getCart) {
            res.status(404).send({ status: 'error', message: 'El carrito que buscas no existe o no se encuentra disponible.' })
        }
        res.send({ status: 'success', data: getCart })
    } catch (error) {
        console.log('Carrito no encontrado', error);
    }
})

router.post('/', async (req, res) => {
    const { products } = req.body
    try {
        const crearCarrito = await cartManager.createCart(products)
        res.send({ status: 'success', data: crearCarrito })
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'El carrito no pudo ser creado', error });
    }
})

router.post('/:cid/products/:pid', async (req, res) => {

    const { cid, pid } = req.params
    try {
        const updatedCart = await cartManager.createProductCart(cid, pid);
        if (!updatedCart) {
            throw new Error('Error al añadir el producto al carrito');
        }
        console.log('Carrito actualizado:', updatedCart);
        res.send({ status: 'success', data: updatedCart })
    } catch (error) {
        console.error(error);
        if (error.message === 'Error, producto no encontrado en la base de datos') {
            return res.status(404).json({ status: 'error', message: error.message });
        }
        res.status(500).json({ status: 'error', message: 'Error en el servidor al procesar la solicitud' });
    }
})




module.exports = router