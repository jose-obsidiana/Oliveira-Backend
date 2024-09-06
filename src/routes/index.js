const { Router } = require('express')

//routes
// const productsRoutes = require('./api/productsRoutes.js');
// const cartsRoutes = require('./api/cartsRoutes.js');
// const viewsRoutes = require('./viewsRoutes.js');
const viewsRoutesMongo = require('./viewsRoutes.mongo.js');
const realTimeProductsMongo = require('./mongo/realTimeProducts.mongo.js');
const productsRoutesMongo = require('./mongo/productsRoutes.mongo.js')
const cartsRoutesMongo = require('./mongo/cartsRoutes.mongo.js')
//const usersRoutes = require('./mongo/usersRoutes.js')


const router = Router()


// Endpoints
router.use('/', viewsRoutesMongo);
router.use('/realtimeproducts', realTimeProductsMongo);
router.use('/mongo/products', productsRoutesMongo)
router.use('/mongo/carts', cartsRoutesMongo)
// router.use('/api/products', productsRoutes);
// router.use('/api/carts', cartsRoutes);
// router.use('/api/users', usersRoutes)



module.exports = router