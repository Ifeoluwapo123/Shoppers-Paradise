const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controller");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(express.static("public"));

/**
 * @openapi
 * /:
 *   get:
 *     description: get products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         required: true
 *         type: string
 */
router.get("/", productController.getOtherProducts);

/**
 * @openapi
 * /{userId}:
 *   get:
 *     description: get user's products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: params
 *         required: true
 *         type: string
 */
router.get("/:userId", productController.getUserProducts);

/**
 * @openapi
 * /delete:
 *   post:
 *     description: delete user's product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: body
 *         required: true
 *         type: string
 */
router.post("/delete", productController.deleteUserProducts);

/**
 * @openapi
 * /update:
 *   post:
 *     description: update user's product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productname
 *         in: body
 *         required: true
 *         type: string
 *       - name: productId
 *         in: body
 *         required: true
 *         type: string
 *       - name: price
 *         in: body
 *         required: true
 *         type: string
 *       - name: quantity
 *         in: body
 *         required: true
 *         type: string
 *       - name: filename
 *         in: multipart/formData
 *         required: true
 *         type: string
 */
router.post("/update", productController.updateUserProduct);

module.exports = router;
