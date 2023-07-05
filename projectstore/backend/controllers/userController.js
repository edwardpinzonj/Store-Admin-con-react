const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },

  createUser: async (req, res) => {
    const { username, email, provider, password, confirmed, blocked, role } =
      req.body;

    try {
      // Encriptar la contraseña antes de almacenarla
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        provider,
        password: hashedPassword,
        confirmed,
        blocked,
        role,
      });

      await user.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  updateUser: async (req, res) => {
    const { username, email, provider, password, confirmed, blocked, role } =
      req.body;
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verificar si la contraseña ha sido modificada
      let hashedPassword = user.password;
      if (password && password !== user.password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          provider,
          password: hashedPassword,
          confirmed,
          blocked,
          role,
        },
        { new: true }
      );

      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      await User.findByIdAndDelete(id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};

module.exports = userController;
