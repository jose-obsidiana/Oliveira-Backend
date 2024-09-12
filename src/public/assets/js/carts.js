const deleteProductButtons = document.querySelectorAll('.deleteProductButtons')


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
