const { Router } = require("express");
const ProductManager = require('../../daos/FILESYSTEM/productsManagers.js')
const userModel = require('../../models/usersModel.js')

const router = Router();
const productos = new ProductManager('./dbJson/products.json')



router.get('/', async (req, res) => {


    try {
        const mostrarLista = await productos.getProducts();
        if (!mostrarLista) {
            res.status(400).send({ status: 'error', message: 'Error al obtener los productos' });
        }
        res.send({ status: 'success', data: mostrarLista })
    } catch (error) {
        console.log('Productos no encontrados', error);
        res.status(500).send({ status: 'error', message: 'Error al obtener los productos' });

    }

});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params

    try {
        const mostrarProducto = await productos.getProductById(pid)

        if (!mostrarProducto) {
            return res.status(404).json({ error: 'El producto que buscas no existe o no se encuentra disponible.' })
        }
        console.log(mostrarProducto);
        res.send({ status: 'success', data: mostrarProducto })

    } catch (error) {
        res.status(500).send('Error al obtener el producto');
    }
})


router.post('/', async (req, res) => {

    const { title, category, description, price, thumbnail, stock } = req.body;
    console.log(req.body);
    try {
        if (!title || !category || !description || !price || !stock) {
            return res.status(400).json({
                status: 'error',
                message: 'Los campos: "title, category, description, price y stock" son obligatorios.'
            });
        }
        const agregarProductos = await productos.addProduct(title, category, description, price, thumbnail, stock);
        return res.send({ status: 'success', data: agregarProductos })

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error de servidor' });
        return console.log('Error al agregar producto:', error);
    }
})


router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const newDetails = req.body
    try {
        const actualizarProducto = await productos.updateProductById(Number(pid), newDetails);

        res.send({ status: 'success', data: actualizarProducto });
        console.log('Producto actualizado correctamente');
    }
    catch (error) {
        if (error.message === 'No se puede modificar el campo id ni agregar campos no permitidos') {
            res.status(400).send({ status: 'error', message: 'No se puede modificar el campo id ni agregar campos no permitidos' });
        } else {
            res.status(400).send({ status: 'error', message: 'Error al actualizar el producto' });
        }
    }
});

router.delete('/:pid', async (req, res) => {

    const { pid } = req.params

    try {
        const borrarProducto = await productos.deleteProduct(Number(pid));
        if (!borrarProducto) {
            return res.status(404).send({ status: 'error', message: 'El producto que intentas eliminar no ha sido encontrado' });
        }

        res.send({ status: 'success', message: 'producto eliminado exitosamente', data: borrarProducto });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al borrar el producto' });

    }
})

module.exports = router;