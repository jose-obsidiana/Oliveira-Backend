const { connect } = require('mongoose');
const cartModel = require('../models/cartsModel.js');

const connectDB = async () => {
    console.log('Base de datos conectada');
    await connect('mongodb+srv://joseoliveira:Z0B1l1jcRX19BwfE@joseoliveira.75t2f.mongodb.net/oliveiraBackend?retryWrites=true&w=majority&appName=JoseOliveira')



    //creo un cart -- router POST -- manager create
    // const response = await cartModel.create({ products: [] })


    // // agrego un producto al carrito -- router cart PUT product en el carrito
    //cart.products.push({ product: '66d72653328297c3982a9727', quantity: 5 }) // id del producto a agregar
    // const updateCart = await cartModel.findByIdAndUpdate({ _id: '66d86d95b0d9a9b1a0313c9d' }, cart)// id del carrito a actualizar


    // router GET para mostrar un carrito por id
    //  const cart = await cartModel.findOne({ _id: '66d86d95b0d9a9b1a0313c9d' }) // id del carrito que quiero encontrar


    // console.log(JSON.stringify(cart, null, 2))
}

module.exports = connectDB