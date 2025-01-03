const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../Helpers/cloudinary");

const router = express.Router();

router.route("/upload-image").post(upload.single("my_file"), handleImageUpload);
router.route("/add").post(addProduct);
router.route("/edit/:id").put(editProduct);
router.route("/get").get(fetchAllProducts);
router.route("/delete/:id").delete(deleteProduct);

module.exports = router;
