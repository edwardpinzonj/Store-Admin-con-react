try {
  const multer = require("multer");
  const path = require("path");

  // Configuración de multer para la subida de imágenes
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./backend/uploads/"); // Carpeta de destino de las imágenes
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const filename = file.fieldname + "-" + uniqueSuffix + extension;
      cb(null, filename); // Nombre de archivo único
    },
  });

  // Configuración del middleware multer

  const upload = multer({ storage: storage });

  module.exports = upload;
} catch (error) {
  console.log("Error en el Middleware Multer", error);
}
