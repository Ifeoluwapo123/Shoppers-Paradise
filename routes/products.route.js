const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controller");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(express.static("public"));

/**
 * @openapi
 * /api/products/:
 *   get:
 *     description: get products
 *     responses:
 *        '200':
 *          description: ok
 *        '500':
 *          description: internal server error
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
 * /api/products/{userId}:
 *   get:
 *     description: get user's products
 *     responses:
 *        '200':
 *          description: ok
 *        '404':
 *          description: not found
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
 * /api/products/delete:
 *   post:
 *     description: delete user's product
 *     responses:
 *        '200':
 *          description: Successfully deleted order
 *        '500':
 *          description: internal error
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
 * /api/products/update:
 *   post:
 *     description: update user's product
 *     responses:
 *        '204':
 *          description: Successfully updated
 *        '403':
 *          description: empty fields
 *        '500':
 *          description: internal serever error
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
