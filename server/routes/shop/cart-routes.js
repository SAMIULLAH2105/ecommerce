const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.route("/add").post(addToCart);

router.route("/get/:userId").get(fetchCartItems);

router.route("/update-cart").put(updateCartItemQty);

router.route("/:userId/:productId").delete(deleteCartItem);

module.exports = router;
