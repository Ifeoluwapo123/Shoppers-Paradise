const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const productController = require("../controllers/products.controller");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(express.json());
router.use(express.static("public"));

//all products that are not uploaded by users
router.get("/", productController.getOtherProducts);

//products uploaded by users
router.get("/:userId", productController.getUserProducts);

//users delete their product(s)
router.post("/delete", productController.deleteUserProducts);

//update products
router.post("/update", productController.updateUserProduct);

module.exports = router;
