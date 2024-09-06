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

    async createProduct(title, category, description, price, file, stock, code) {

        const product = {
            title,
            category,
            description,
            price,
            file,
            stock,
            code
        };

        try {
            // Verifica si el producto ya existe
            const exists = await this.model.findOne({ code: product.code });

            if (exists) {
                throw new Error(`El producto con el código ${product.code} ya existe`);
            }

            // Crea el nuevo producto
            const createProduct = await this.model.create(product);
            console.log('Producto agregado correctamente:', createProduct);
            return createProduct;
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