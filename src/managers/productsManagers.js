const fs = require("fs");
// "node src/server.js"



class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    // traer todos los productos
    getProducts = async () => {
        try {
            let resultado = await fs.promises.readFile(this.path, 'utf-8') // leo el json
            this.products = JSON.parse(resultado)
            return this.products

        } catch (error) {
            console.log('Error al leer los productos', error)
            return [];
        }

    }

    // traer product por id
    async getProductById(productId) {
        try {
            const products = await this.getProducts()
            let resultado = products.find(producto => Number(producto.id) == Number(productId));

            if (!resultado) {
                throw new Error('El producto que buscas no existe');
            }
            return resultado;
        }
        catch (error) {
            return console.log('Producto no encontrado.', error);
        }
    }

    // agregar products
    async addProduct(title, category, description, price, thumbnail, stock) {

        try {
            let products = await this.getProducts()
            let newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

            const product = {
                title: title,
                category: category,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                id: newId,
                code: 'SKU' + newId,
                status: true
            }

            const exists = products.some(p => p.code === product.code);
            if (exists) {
                throw new Error(`El producto con el código ${code} ya existe`)
            }

            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8') // agrego mis nuevos productos en un json
            this.products = products
            console.log('Producto agregado correctamente');
            return product;
        } catch (error) {
            console.log('Error al agregar producto:', error);
        }
    };




    // actualizar producto por id
    async updateProductById(productId, newDetails) {
        try {
            let products = await this.getProducts();
            let product = products.find(producto => producto.id === productId);

            if (!product) {
                throw new Error('Producto no encontrado');
            }

            // Verificar si se está intentando modificar el campo id o agregar nuevos campos
            const camposRequeridos = ['title', 'category', 'description', 'price', 'thumbnail', 'stock'];
            const newDetailsKeys = Object.keys(newDetails);

            // Verificar si hay campos no permitidos o si el campo 'id' está presente
            const camposInvalidos = newDetailsKeys.some(key => !camposRequeridos.includes(key) || key === 'id');
            if (camposInvalidos) {
                throw new Error('No se puede modificar el campo id ni agregar campos no permitidos');
            }

            // Actualizar el producto sin modificar el campo id
            products = products.map(producto =>
                producto.id === productId ? { ...producto, ...newDetails } : producto
            );

            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
            this.products = products;
            return this.products;
        } catch (error) {
            console.log('Error al actualizar producto', error);
            throw error;
        }
    }



    // borrar producto por su id
    async deleteProduct(productId) {

        try {
            let listaProductos = await this.getProducts()
            let resultado = listaProductos.filter(product => product.id !== productId);

            if (resultado && (resultado.length < listaProductos.length)) {
                await fs.promises.writeFile(this.path, JSON.stringify(resultado), 'utf-8');
                console.log('Producto eliminado exitosamente');
                this.products = resultado
                return this.products;
            }
            else {
                return console.log('Producto no encontrado');
            }

        } catch (error) {
            console.log('Error al eliminar el producto', error);
            return null;
        }
    }
}



module.exports = ProductManager