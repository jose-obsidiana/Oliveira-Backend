const { Router } = require('express')
const CartDaosMongo = require('../../daos/MONGO/cartsDaos.mongo.js')
const mongoose = require('mongoose')

const router = Router()
const cartService = new CartDaosMongo()


router.get('/:cid', async (req, res) => {

    const { cid } = req.params
    const cart = await cartService.getCartById(cid);

    console.log('Carrito obtenido:', JSON.stringify(cart, null, 2));


    const cartMap = cart.products.map(prod => {
        const { ...rest } = prod.toObject();
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
    const { user } = body

    if (!user) {
        return res.status(400).send({ status: 'error', message: 'No se puede crear carrito porque no se genera un usuario' })
    }

    try {
        const postCart = await cartService.createCart(body)

        const userLogin = {
            username: user
        }
        console.log('carrito creado correctamente')
        res.json({ status: 'success', userLogin, postCart });
    } catch (error) {
        res.send({ status: 'error', message: 'Error al intentar crear un carrito', error })
    }

})

router.post('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid, pid } = req.params
        const { quantity, productId } = req.body

        const updatedCart = await cartService.createProductToCart(cid, pid, Number(quantity), productId);

        if (!updatedCart) {
            return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
        }

        res.send({ status: 'success', cart: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: 'Error al actualizar el carrito', error });
    }
})


router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantityChange } = req.body

        const updatedProduct = await cartService.updatedProductToCart(cid, pid, quantityChange)

        if (!updatedProduct) {
            return res.status(400).send({ status: 'error', message: 'El producto que desea actualizar no se encuentra disponible o no existe' })
        }
        res.json({ status: 'soccess', message: 'Producto actualizado con éxito', updatedProduct })
    }
    catch (error) {
        res.status(500).send({ status: 'error', message: "Error en el servidor, el producto no puede ser actualizado" })
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid, pid } = req.params
        console.log('Llamando a deleteProductToCart con:', cid, pid);

        const deleteProduct = await cartService.deleteProductToCart(cid, pid)

        if (!deleteProduct) {
            return res.status(400).send({ status: 'error', message: 'El producto que desea eliminar no existe o no se encuentra disponible' });
        }

        res.json({ status: 'success', message: 'Producto eliminado con éxito', deleteProduct });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Error al intentar eliminar producto' })
    }
})

module.exports = router