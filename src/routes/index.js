const { Router } = require('express')

//routes
const productsRoutes = require('./api/productsRoutes.js');
const cartsRoutes = require('./api/cartsRoutes.js');
const viewsRoutes = require('./viewsRoutes.js');
const realTimeProducts = require('./api/realTimeProducts.js');
const usersRoutes = require('./api/usersRoutes.js')
const productsRoutesMongo = require('./mongo/productsRoutes.mongo.js')
const cartsRoutesMongo = require('./mongo/cartsRoutes.mongo.js')


const router = Router()


// Endpoints
router.use('/', viewsRoutes);
router.use('/realtimeproducts', realTimeProducts);
router.use('/api/products', productsRoutes);
router.use('/api/carts', cartsRoutes);
router.use('/api/users', usersRoutes)
router.use('/mongo/products', productsRoutesMongo)
router.use('/mongo/carts', cartsRoutesMongo)



module.exports = router