const { Router } = require("express")
const ProductDaosMongo = require('../daos/MONGO/productsDaos.mongo.js');
const productModel = require('../models/productModel.js')

const uploader = require("../utils/multer.js");

const router = Router();

const productService = new ProductDaosMongo()



router.get('/', uploader.single('myFile'), async (req, res) => {
    let filePath = '';
    let limit = 8;
    let page = req.query.page || 1;

    if (req.file) {
        filePath = `/static/assets/img/${req.file.filename}`;
        res.json({ file: filePath, message: 'Archivo subido con éxito' })
    }


    const { user } = req.body

    const userLogin = {
        username: user
    }

    try {
        const products = await productModel.paginate({}, { limit, page })

        const productMap = products.docs.map(prod => {
            const { ...rest } = prod.toObject();
            return rest;
        })


        if (!productMap) {
            return res.status(400).send({ status: 'error', message: 'Error al obtener los productos' });
        }


        res.render('home', {
            title: 'Home',
            style: 'index.css',
            user: userLogin,
            isUser: userLogin.username === user,
            filePath,
            products: productMap,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages
        })
    } catch (error) {
        console.log('Productos no encontrados', error);
        res.status(500).send({ status: 'error', message: 'Productos no encontrados' });
    }

})

module.exports = router
