const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  controller: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  policy: {
    type: String,
    required: true,
  },
});

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
