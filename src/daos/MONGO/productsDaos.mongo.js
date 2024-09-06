const productModel = require('../../models/productModel.js')
const mongoose = require('mongoose')

class ProductDaosMongo {
    constructor() {
        this.model = productModel;
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
            throw Error;
        }
    }

    async createProduct(newProduct) {
        try {
            // Verifica si el producto ya existe
            const exists = await this.model.findOne({ code: newProduct.code });

            if (exists) {
                throw new Error(`El producto con el código ${newProduct.code} ya existe`);
            }

            // Crea el nuevo producto
            const product = await this.model.create(newProduct);
            console.log('Producto agregado correctamente:', product);
            return product;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            throw error;
        }
    }



    updateProduct = async (_id) => {
        await this.model.updateOne(_id)
    }

    deleteProduct = async (_id) => {
        return await this.model.deleteOne({ _id })
    }

}



module.exports = ProductDaosMongo