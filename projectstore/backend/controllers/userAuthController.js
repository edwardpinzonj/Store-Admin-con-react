const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    // Crea un nuevo usuario
    const user = new User(req.body);

    // Genera una contraseña hash utilizando bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    //Datos por definir
    user.provider = "local";
    // Guarda el usuario en la base de datos
    await user.save();

    // Genera un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Devuelve el token y el usuario recién creado en la respuesta
    res.status(201).json({ token, user });
  } catch (error) {
    console.log("error Create User", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca al usuario por su dirección de correo electrónico en la base de datos
    const user = await User.findOne({ email }).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    // Verifica si el usuario existe y si la contraseña es válida
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Genera un token JWT para el usuario autenticado
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await User.findByIdAndUpdate(
      user._id,
      {
        active: true,
      },
      { new: true }
    );
    // Devuelve el token y el usuario autenticado en la respuesta
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  const userId = req.headers.userid;
  const token = authHeader && authHeader.split(" ")[1];
  await User.findByIdAndUpdate(
    userId,
    {
      active: false,
    },
    { new: true }
  );

  res.json({ message: "Logout exitoso", token });
};

module.exports = {
  createUser,
  getUsers,
  login,
  logout,
};
