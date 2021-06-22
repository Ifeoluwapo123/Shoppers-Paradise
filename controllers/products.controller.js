const Product = require("../models/Product");
const fs = require("fs");
const config = require("../config/config").image;
const convertImageToBase64 = require("../utils/inputValidate.js");
const Storage = require("../dist/storage");
const handleResponse = require("../utils/response.js");

const ProductController = function () {};

ProductController.getUserProducts = function (req, res) {
  const id = req.params.userId;
  Product.productsByUsers(function (err, data) {
    if (err) handleResponse(req, res, 500);
    else {
      const response = data.filter((row) => row.user_id === parseInt(id));
      if (!response.length)
        handleResponse(req, res, 203, {
          data: response,
        });
      else {
        const resp = response.map((result) => {
          return {
            ...result,
            image: convertImageToBase64("images", result.image_name),
          };
        });
        handleResponse(req, res, 200, {
          data: resp,
        });
      }
    }
  });
};

ProductController.getOtherProducts = function (req, res) {
  const id = req.query.id;
  Product.productsNotByUser(function (err, data) {
    if (err) handleResponse(req, res, 500);
    else {
      const response = data.filter((row) => row.user_id !== parseInt(id));
      const resp = response.map((result) => {
        try {
          return {
            ...result,
            image: convertImageToBase64("images", result.image_name.trim()),
          };
        } catch (err) { 
          return handleResponse(req, res, 200, { data: data });
        }
      });
      handleResponse(req, res, 200, {
        data: resp,
      });
    }
  });
};

ProductController.deleteUserProducts = function (req, res) {
  const product_id = req.body.id;
  Product.delete(product_id, function (data) {
    if (data.affectedRows > 0) handleResponse(req, res, 200);
  });
};

ProductController.updateUserProduct = function (req, res) {
  let setPath = new Storage(config.product, config.filetypes),
  upload = setPath.uploadFile();

  upload(req, res, (err) => {
    if (err) {
      handleResponse(req, res, 500, null, "error while uploading");
    } else {
      if (req.file == undefined) {
        handleResponse(req, res, 403, null, "no file selected");
      } else {
        if (
          req.body.productname === "" ||
          req.body.price === "" ||
          req.body.quantity === ""
        ) {
          fs.unlink("./public/images/" + req.file.filename, (err, success) => {
            if (err) console.log("can't remove the image");
            else console.log("succesfully removed file");
          });
          handleResponse(req, res, 403, null, "field(s) cannot be empty");
        }

        if (req.body.type === "Select product type") {
          handleResponse(req, res, 403, null, "select product type");
        }

        const post = [
          req.body.type,
          req.body.price,
          req.file.filename,
          req.body.quantity,
          req.body.productname,
          req.body.productid,
        ];

        Product.update(post, function (err, data) {
          if (err) handleResponse(req, res, 500);
          handleResponse(req, res, 204);
        });
      }
    }
  });
};

module.exports = ProductController;
