// import mongoose, { Mongoose } from "mongoose";
const mongoose = require("mongoose");
const { Mongoose } = require("mongoose");

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
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const Userr = mongoose.model("Userr", UserSchema);
module.exports = Userr;
