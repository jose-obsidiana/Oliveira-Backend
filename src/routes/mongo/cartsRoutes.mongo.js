const { Router } = require('express')
const CartDaosMongo = require('../../daos/MONGO/cartsDaos.mongo.js')
const mongoose = require('mongoose')

const router = Router()
const cartService = new CartDaosMongo()


router.get('/:cid', async (req, res) => {

    const { cid } = req.params
    const cart = await cartService.getCartById(cid);
    console.log('Carrito obtenido:', cart);
    console.log(JSON.stringify(cart, null, 2))

    const cartMap = cart.products.map(prod => {
        const { _id, ...rest } = prod.toObject();
        return rest;
    })

    try {
        if (!cart) {
            return res.status(400).send({ status: 'error', message: 'Error al obtener carrito' });
        }

        res.render('carts', {
            title: 'Cart',
            products: cartMap,
            style: 'index.css'

        });

    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
    }

})

router.post('/', async (req, res) => {
    const { body } = req
    const postCart = await cartService.createCart(body)
    res.send({ status: 'success', postCart })
})

router.put('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid, pid } = req.params
        const { quantity } = req.body

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).send({ status: 'error', message: 'Cantidad inválida' });
        }


        const updatedCart = await cartService.createProductToCart(cid, pid, quantity);
        if (!updatedCart) {
            return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
        }

        res.send({ status: 'success', cart: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: 'Error al actualizar el carrito', error });
    }
})

// router.put('/:cid/products/:pid', async (req, res) => {

//     try {
//         const { cid, pid } = req.params
//         const { quantity } = req.body


//         const updatedCart = await cartService.updatedCart(cid, pid, quantity);
//         if (!updatedCart) {
//             return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
//         }


//         res.send({ status: 'success', cart: updatedCart });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ status: 'error', message: 'Error al actualizar el carrito', error });
//     }
// })


module.exports = router