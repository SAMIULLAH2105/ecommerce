const express = require("express");

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
  newTest,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
// router.post("/capture", capturePayment);
router.post("/capture", capturePayment);
router.post("/testing", newTest);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
