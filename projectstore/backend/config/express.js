const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const configureExpress = () => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  return app;
};

module.exports = configureExpress;
