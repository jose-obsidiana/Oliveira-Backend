
const socket = io()

const deleteProductButtons = document.querySelectorAll('.deleteProductButtons')



const cartId = localStorage.getItem('cartId')
if (!cartId) {
    throw new Error('Cart ID no es válido');
} else {
    console.log('enviando el cartId', cartId)
    socket.emit('getCartById', cartId)
}



// renderizar productos
function renderProductsCart(data) {
    let productsCart = document.querySelector('.products-cart')
    if (!productsCart) return;


    let productosHTML = ''

    data.products.forEach(prod => {
        productosHTML += `
         <ul class="cart-detalles">
            <li><img src="${prod.product.file}" alt="${prod.product.title}"></li>
            <li>${prod.product.title}</li>
            <li>${prod.product.price}</li>

            <li class="li-quantity">
                <div class="updated-quantity">
                    <button class="update-product-button updated-button" data-product-id="${prod.product._id}"
                        data-action="decrease">-</button>
                    <p>${prod.quantity}</p>
                    <button class="update-product-button updated-button" data-product-id="${prod.product._id}"
                        data-action="increase">+</button>
                </div>
            </li>

            <li><button class="deletedProductButton" data-product-id="${prod.product._id}">Eliminar</button></li>

        </ul>
  
        `
    })

    productsCart.innerHTML = productosHTML;


    const deletedProductButton = document.querySelectorAll('.deletedProductButton')

    deletedProductButton.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault()

            const cartId = localStorage.getItem('cartId')
            const productId = event.target.getAttribute('data-product-id')

            socket.emit('deletedProductFromCart', { cartId, productId })
        })
    })

    // update product to cart fetch
    const updateProductButtons = document.querySelectorAll('.update-product-button')
    updateProductButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault()

            const productId = event.target.getAttribute('data-product-id')
            const cartId = localStorage.getItem('cartId')
            const action = event.target.getAttribute('data-action')
            const quantityChange = action === 'increase' ? 1 : -1;

            console.log('enviando actualizacion', { cartId, productId, quantityChange });
            socket.emit('updateProductQuantity', { cartId, productId, quantityChange })

        })
    })


}



// delete product to cart fetch
deleteProductButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault()
        const productId = event.target.getAttribute('data-product-id')
        const cartId = localStorage.getItem('cartId')

        try {
            const response = await fetch(`/carts/${cartId}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar el producto');
            }
            const data = await response.json();
            console.log('Producto eliminado del carrito:', data);

        } catch (error) {
            console.error('Error al eliminar producto:', error)
        }
    })
})



//socket
//delete
socket.on('listaProductFromCart', (data) => {
    console.log('recibiendo los productos', data);
    if (!data || !data.products) {
        console.error('No se encontraron productos en el carrito');
        return;
    }
    renderProductsCart(data);
});
socket.on('updatedProductsFromCart', (data) => {
    renderProductsCart(data)
})


//updated
socket.on('productQuantityUpdated', (data) => {
    renderProductsCart(data)
})





// try {
//     const response = await fetch(`/carts/${cartId}/products/${productId}`, {

//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ quantityChange })
//     })

//     if (!response.ok) {
//         throw new Error('Error al actualizar la cantidad del producto')
//     }
//     const data = await response.json()
//     console.log('Cantidad actualizada', data)

// } catch (error) {
//     console.error('Error al actualizar cantidad del producto, la respuesta no se pudo enviar al servidor', error)
// }