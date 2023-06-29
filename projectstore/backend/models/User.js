const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  confirmed: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
