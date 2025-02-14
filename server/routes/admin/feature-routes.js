const express = require("express");
const {
  removeFeatureImage,
} = require("../../controllers/admin/feature-controller");

const router = express.Router();

router.delete("/remove/:id", removeFeatureImage);

module.exports = router;
