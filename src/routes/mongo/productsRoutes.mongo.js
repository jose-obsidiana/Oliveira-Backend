const { Router } = require("express");
const ProductDaosMongo = require("../../daos/MONGO/productsDaos.mongo.js");
const mongoose = require('mongoose')


const router = Router()
const productService = new ProductDaosMongo()


router.get('/', async (req, res) => {
    try {
        const productDb = await productService.getProducts()
        res.send({ status: 'success', payload: productDb })
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'No se pueden obtener los productos' })
    }
})

router.get('/:pid', async (req, res) => {

    const { pid } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(pid)) {
            console.log('ID no válido:', pid);
            return res.status(400).send({ status: 'error', message: 'ID no válido' });
        }
        const productById = await productService.getProductById(pid)
        console.log('Producto encontrado:', productById);

        if (!productById) {
            console.log('Producto no encontrado');
            return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }

        res.send({ status: 'success', payload: productById })

    } catch (error) {
        console.log('error al obtener producto', error)
        res.status(500).send({ status: 'error', message: 'Error en el servidor al obtener el producto' });
    }
})

router.post('/', async (req, res) => {

    try {
        const { body } = req
        // const { title, category, description, price, stock, code, file } = req.body
        const createProduct = await productService.createProduct(body)

        // if (!title || !category || !description || !price || !stock || !code || !file) {
        //     res.status(400).send({ status: 'error', message: 'Es necesario completar todos los campos' })
        // }

        res.send({ status: 'success', payload: createProduct, message: 'Producto creado correctamente' })
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'No se puede crear el producto ', error })
    }
})

router.put('/:pid', async (req, res) => {

    try {
        const { pid } = req.params
        let updateProduct = req.body
        const newProduct = await productService.updateOne({ _id: pid }, updateProduct)
        res.send({ status: 'success', payload: newProduct })
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'No se puede actualizar el producto ' })
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).send({ status: 'error', message: 'ID no válido' });
        }

        const deleteProduct = await productService.deleteProduct({ _id: pid })

        if (!deleteProduct) {
            console.log('Producto no encontrado');
            return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }

        res.send({ status: 'success', payload: deleteProduct, message: 'Producto eliminado con éxito' })
    } catch (error) {
        res.status(400).send({ status: 'error', message: 'No se puede eliminar el producto ' })
    }
})

module.exports = router
