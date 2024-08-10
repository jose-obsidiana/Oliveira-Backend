const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Usa `path.join()` para construir la ruta de destino
        callback(null, path.join(__dirname, '../public/assets/img'));
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = multer({ storage });

module.exports = uploader;

