const { connect } = require('mongoose')

const connectDB = async () => {
    console.log('Base de datos conectada');
    return await connect('mongodb+srv://joseoliveira:Z0B1l1jcRX19BwfE@joseoliveira.75t2f.mongodb.net/oliveiraBackend?retryWrites=true&w=majority&appName=JoseOliveira')
}

module.exports = connectDB