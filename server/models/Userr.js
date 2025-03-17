const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // If googleId exists, password is not required
    },
  },
  role: {
    type: String,
    default: "user",
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values for googleId
  },
});

const Userr = mongoose.model("Userr", UserSchema);
module.exports = Userr;
