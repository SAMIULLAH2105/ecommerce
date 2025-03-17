const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// For OAuth
const session = require("express-session");
const passport = require("passport");
require("./Helpers/passport");

// Routers
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminFeatureRouter = require("./routes/admin/feature-routes");

const shopProductRouter = require("./routes/shop/products-route");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const orderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// const authRouter = require("./routes/auth/auth-routes");

mongoose
  .connect(
    "mongodb+srv://samiullah21january:samiullah21january123@cluster0.vma0t.mongodb.net/"
  )
  .then(() => console.log(`Mongodb connected `))
  .catch((err) => console.log(`Error`, err));

// creating db connnection
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(
  session({
    secret: "YOUR_SESSION_SECRET",
    resave: false,
    saveUninitialized: false, // Make sure it's false to avoid unnecessary session storage
    cookie: { secure: false }, // Change to true if using HTTPS
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/feature", adminFeatureRouter);

app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", orderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
