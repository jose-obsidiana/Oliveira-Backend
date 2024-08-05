const { Router } = require("express");
const CartManager = require("../managers/cartsManager");

const router = Router();
const cartManager = new CartManager('./carts.json')



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
        return null;
    }
})




module.exports = router