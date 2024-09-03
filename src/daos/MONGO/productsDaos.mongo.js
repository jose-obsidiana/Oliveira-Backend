const productModel = require('../../models/productsModel.js')
const mongoose = require('mongoose')

class ProductDaosMongo {
    constructor() {
        this.model = productModel
    }

    getProducts = async () => {
        return await this.model.find()
    }

    getProductById = async (id) => {
        try {

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('ID no válido');
            }

            return await this.model.findOne({ _id: id });
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            throw error;
        }
    }

    createProduct = async (newProduct) => {
        await this.model.create(newProduct)
    }

    updateProduct = async (_id) => {
        await this.model.updateOne(_id)
    }

    deleteProduct = async (_id) => {
        return await this.model.deleteOne({ _id })
    }

}



module.exports = ProductDaosMongo