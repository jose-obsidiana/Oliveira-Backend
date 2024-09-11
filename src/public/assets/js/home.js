
let user;

const addToCartButtons = document.querySelectorAll('.addToCart')
const verCarrito = document.querySelector('#verCarrito')

Swal.fire({
    title: '¡Identifícate!',
    input: 'text',
    text: 'Ingrese un nombre de usuario para poder acceder a nuestro sitio.',
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre de usuario para conectarte';
    },
    allowOutsideClick: false // Para que no se cierre si hago click fuera del alert.
}).then(result => {
    if (result.isConfirmed) { // Verifica que el usuario confirme el diálogo
        user = result.value;
        console.log('Nombre de usuario ingresado:', user);

        fetch('/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user })
        })
            .then(response => {
                if (!response.ok) { // Verifica que la respuesta sea exitosa
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('cartId', data.postCart._id)
                console.log('Cart ID guardado en el localStorage:', data.postCart._id);
            })
            .catch(error => {
                console.error('Error al enviar el nombre de usuario:', error);
            });
    }
});


addToCartButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const productId = event.target.getAttribute('data-product-id')
        const cartId = localStorage.getItem('cartId')

        if (!cartId) {
            console.error('No se encontró el cartId en el localStorage');
            return;
        }

        try {
            const response = await fetch(`/carts/${cartId}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: 1, productId: productId })
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto al carrito');
            }

            const data = await response.json();
            console.log('Producto agregado al carrito:', data);
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    })
})

verCarrito.addEventListener('click', async (e) => {
    e.preventDefault()
    const cartId = localStorage.getItem('cartId')
    if (cartId) {
        window.location.href = `/carts/${cartId}`;
    } else {
        alert('No hay carrito creado aún.');
    }
})
