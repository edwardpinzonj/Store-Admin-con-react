const { configureExpress, connectDB } = require("./config");
const routes = require("./routes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = configureExpress();

connectDB();

// Configuración de las rutas
//app.use("/api", routes);
// Configurar CORS para permitir solicitudes desde el dominio del frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend
    optionsSuccessStatus: 200, // Configuración adicional para respuestas exitosas
  })
);

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "Token de autenticación requerido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token de autenticación inválido" });
    }

    req.user = user;
    next();
  });
};

// Configuración de las rutas sin protección
app.use("/api/auth", userAuthRoutes);
// Configuración de las rutas protegidas
app.use("/api", authenticateToken, routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
