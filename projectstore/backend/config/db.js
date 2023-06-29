const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://edwardpinzonj:FAPYREzTZKDLM60O@cluster0.j8qmd.mongodb.net/?retryWrites=true&w=majority",
      //"mongodb+srv://edwardpinzonj:FAPYREzTZKDLM60O@cluster0.j8qmd.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Salir del proceso con un código de error
  }
};

module.exports = connectDB;
