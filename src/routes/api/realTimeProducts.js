// // Realtime products
// router.get('/', async (req, res) => {
//     const userLogin = {
//         full_name: 'Jose Oliveira',
//         role: 'admin'
//     };

//     try {
//         const mostrarLista = await productManager.getProducts();
//         if (!mostrarLista) {
//             res.status(400).send({ status: 'error', message: 'Error al obtener los productos' });
//         }
//         res.render('realTimeProducts', {
//             title: 'RealTimeProducts',
//             style: 'index.css',
//             user: userLogin,
//             isAdmin: userLogin.role === 'admin',
//             mostrarLista
//         });
//     } catch (error) {
//         console.log('Productos no encontrados', error);
//         res.status(500).send({ status: 'error', message: 'Productos no encontrados' });
//     }
// });

// router.post('/upload', uploader.single('myFile'), async (req, res) => {
//     if (req.file) {
//         const filePath = `/static/assets/img/${req.file.filename}`;
//         res.json({ file: filePath, message: 'Archivo subido con éxito' });
//         console.log('Archivo subido con éxito');
//         const { title, category, description, price, stock } = req.body;
//         try {
//             await productManager.addProduct(title, category, description, price, filePath, stock);
//             // Obtener la lista actualizada de productos
//             const updatedProducts = await productManager.getProducts();
//             // Emitir la lista completa de productos
//             const io = getIo();
//             io.emit('listaProducts', updatedProducts);
//         } catch (error) {
//             res.status(500).send({ status: 'error', message: 'Error de servidor' });
//             console.log('Error al agregar producto:', error);
//         }
//     } else {
//         res.status(400).send('Error al subir el archivo');
//     }
// });
