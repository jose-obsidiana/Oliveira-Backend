const { Router } = require('express')
const CartDaosMongo = require('../../daos/MONGO/cartsDaos.mongo.js')
const mongoose = require('mongoose')

const router = Router()
const cartService = new CartDaosMongo()


router.get('/:cid', async (req, res) => {

    const { cid } = req.params
    const cartDb = await cartService.getCartById(cid)
    res.send({ status: 'success', cartDb })
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

        const updatedCart = await cartService.updateCart(cid, pid, quantity)
        if (!updatedCart)
            return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });

        res.send({ status: 'success', cart: updatedCart });
    }

    catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: 'Error al actualizar el carrito', error });
    }
})


module.exports = router