const { configureExpress, connectDB } = require("./config");
const routes = require("./routes");

const app = configureExpress();
connectDB();

// Configuración de las rutas
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
