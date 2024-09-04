const { Schema, model } = require('mongoose')

const userCollection = 'users';

// metodo para definir un esquema
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
        index: true  // Con esto especifico que last_name va a estar indexado
    },
    username: String,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    gender: String
})



const userModel = model(userCollection, userSchema)
module.exports = userModel