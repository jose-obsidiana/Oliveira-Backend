
console.log('Hola desde home')

let user;
let chatbox = document.querySelector('#chatbox');

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
                console.log('Usuario guardado en el servidor:', data);
            })
            .catch(error => {
                console.error('Error al enviar el nombre de usuario:', error);
            });
    }
});
