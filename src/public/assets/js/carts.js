const deleteProductButtons = document.querySelectorAll('.deleteProductButtons')
const updateProductButtons = document.querySelectorAll('.update-product-button')

// delete product to cart
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

//update product to cart
updateProductButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault()

        const productId = event.target.getAttribute('data-product-id')
        const cartId = localStorage.getItem('cartId')
        const action = event.target.getAttribute('data-action')
        const quantityChange = action === 'increase' ? 1 : -1;

        try {
            const response = await fetch(`/carts/${cartId}/products/${productId}`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantityChange })
            })

            if (!response.ok) {
                throw new Error('Error al actualizar la cantidad del producto')
            }
            const data = await response.json()
            console.log('Cantidad actualizada', data)

        } catch (error) {
            console.error('Error al actualizar cantidad del producto, la respuesta no se pudo enviar al servidor', error)
        }
    })
})