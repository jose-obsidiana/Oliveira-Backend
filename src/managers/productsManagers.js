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
            let resultado = products.find(producto => producto.id == productId);

            if (resultado) {
                return resultado;
            } else {
                console.log('Producto no encontrado');
                return null;
            }
        }
        catch (error) {
            return console.log('Producto no encontrado', error);
        }
    }

    // agregar products
    async addProduct(title, category, description, price, thumbnail, stock) {

        try {
            let products = await this.getProducts()
            let newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            const exists = products.some(product => product.title === title);

            if (exists) {
                return console.log(`El producto con el nombre ${title} ya existe`);
            }

            const product = {
                title: title,
                category: category,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                id: newId,
                code: newId + title,
                status: true
            }
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8') // agrego mis nuevos productos en un json
            this.products = products
            console.log('Producto agregado correctamente');
            return product;
        } catch (error) {
            console.log('Error al agregar el producto:', error);
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

            products = products.map
                (
                    producto => producto.id === productId ? { ...producto, ...newDetails } : producto
                );
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
            this.products = products
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

            if (resultado.length < listaProductos.length) {
                await fs.promises.writeFile(this.path, JSON.stringify(resultado), 'utf-8');
                console.log('Producto eliminado exitosamente');
                this.products = resultado
                return this.products;
            }
            else {
                console.log('Producto no encontrado');
            }

        } catch (error) {
            console.log('Error al eliminar el producto', error);
            return null;
        }
    }
}



module.exports = ProductManager