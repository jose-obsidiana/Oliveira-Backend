console.log('hola socket');


const socket = io()

const form = document.querySelector('#form');
const title = document.querySelector('#title')
const category = document.querySelector('#category')
const description = document.querySelector('#description')
const price = document.querySelector('#price')
const stock = document.querySelector('#stock')
const code = document.querySelector('#code')

const buttonEnviar = document.querySelector('#enviar')
const myFile = document.querySelector('#myFile')




form.addEventListener('submit', async (event) => {
    event.preventDefault()

    let formData = new FormData()
    formData.append('title', title.value.trim())
    formData.append('category', category.value.trim())
    formData.append('description', description.value.trim())
    formData.append('price', parseFloat(price.value))
    formData.append('stock', parseInt(stock.value))
    formData.append('myFile', myFile.files[0])

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            const result = await response.json()
            console.log('producto enviado con éxito', result);

            let product = {
                title: title.value.trim(),
                category: category.value.trim(),
                description: description.value.trim(),
                price: parseFloat(price.value),
                stock: parseInt(stock.value),
                // code: code.value.trim(),
                file: result.file
            }

            socket.emit('nuevoProducto', product)
            console.log(product);
            form.reset();
        }
        else {
            console.log('Error al enviar el producto');
        }

    } catch (error) {
        console.log('error en la solicitud', error);
    }

})


socket.on('listaProducts', (data) => {
    let listaProductos = document.querySelector('#listaProducts')
    let productosHTML = ''

    data.forEach(prod => {
        productosHTML = productosHTML + `
        <div class="lista-container">
           <ul class="lista-productos">
                <li><img src="${prod.file}" alt="${prod.title}"></li>
                <li>${prod.title}</li>
                <li>${prod.category}</li>
                <li>${prod.description}</li>
                <li>$${prod.price}</li>
                <li>${prod.stock}</li>
                <li>${prod.code}</li>
                <li>${prod.id}</li>
            </ul>
        </div>
        `
    });
    listaProductos.innerHTML = productosHTML
})



