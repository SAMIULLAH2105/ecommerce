const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Userr = require("../../models/Userr.js");

// Registration
const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName, email, password);

    // Check if all fields are provided
    if (!userName || !email || !password) {
      return res.json({
        success: false,
        message: "enter all fields",
      });
    }

    // Check for existing user
    const existingUser = await Userr.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    }

    // Hash the password jeo
    const hashPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new Userr({
      userName,
      email,
      password: hashPassword,
    });

    // Save the new user to the database
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error); // Log the error
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Enter Both Email and Password!",
      });
    }

    const findUser = await Userr.findOne({ email });
    if (!findUser) {
      return res.json({
        success: false,
        message: "User Doesn't Exist, PLEASE REGISTER!",
      });
    }

    const matchPassword = await bcrypt.compare(password, findUser.password);
    
    if (!matchPassword) {
      return res.json({
        success: false,
        message: "Invalid credentials - Password!",
      });
    }

    const token = jwt.sign(
      {
        id: findUser._id,
        role: findUser.role,
        email: findUser.email,
        userName: findUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "50m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "logged in successfully",
      user: {
        email: findUser.email,
        role: findUser.role,
        id: findUser._id,
        userName: findUser.userName,
      },
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

// Logout
const logoutUser = async (req, res) => {
  try {
    // token refers to the key we gave in login res
    res.clearCookie("token").json({
      success: true,
      message: "User Logged Out Successfully",
    });
   
  } catch (e) {
    console.log(e);
  }
};

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};
