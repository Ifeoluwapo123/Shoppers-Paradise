const User = require("../models/User");
const fs = require("fs");
const Storage = require("../dist/storage");
const handleResponse = require("../utils/response.js");
const convertImageToBase64 = require("../utils/inputValidate.js");
const UserController = function () {};

UserController.getAllUsers = function (req, res) {
  User.findAll(function (err, data) {
    if (err) handleResponse(req, res, 500);
    else handleResponse(req, res, 200, { data: data });
  });
};

UserController.getCurrentUser = function (req, res) {
  User.findOne(req.params.id, function (err, data) {
    if (err) handleResponse(req, res, 500);
    else if (data) {
      try {
        return handleResponse(req, res, 200, {
          data: {
            ...data,
            image: convertImageToBase64(
              "profileimages",
              data.profile_pics.trim()
            ),
          },
        });
      } catch (error) {
        return handleResponse(req, res, 200, { data: data });
      }
    } else handleResponse(req, res, 404, null, "User Not Found");
  });
};

UserController.userUploadPic = function (req, res) {
  let setPath = new Storage(image.profile, image.filetypes);
  upload = setPath.uploadFile();

  upload(req, res, (err) => {
    if (err) {
      handleResponse(req, res, 500, null, "error while uploading");
    } else {
      if (req.file == undefined) {
        handleResponse(req, res, 403, null, "no file selected");
      } else {
        User.uploadpics([req.file.filename, req.body.user_id], function (err) {
          if (err) handleResponse(req, res, 500);
          handleResponse(req, res, 204);
        });
      }
    }
  });
};

UserController.uploadUserProduct = function (req, res) {
  let setPath = new Storage(image.product, image.filetypes);
  upload = setPath.uploadFile();
  const { productname, price, type, quantity, user_id } = req.body;

  upload(req, res, (err) => {
    if (err) handleResponse(req, res, 500, null, "error while uploading");
    else {
      const { filename } = req.file;
      if (req.file == undefined) {
        handleResponse(req, res, 403, null, "no file selected");
      } else {
        if (req.body.productname === "" || req.body.price === "") {
          fs.unlink("./public/images/" + filename, (err, success) => {
            if (err) {
              console.log("can't remove the image");
            } else {
              console.log("succesfully removed file");
            }
          });
          return handleResponse(
            req,
            res,
            403,
            null,
            "field(s) cannot be empty"
          );
        }

        if (type === "Select product type") {
          return handleResponse(req, res, 403, null, "select product type");
        }

        User.uploadproduct(
          {
            type: type,
            productname: productname,
            price: price,
            image_name: filename,
            quantity: quantity,
            user_id: user_id,
          },
          function (err) {
            if (err) handleResponse(req, res, 500);
            handleResponse(req, res, 204);
          }
        );
      }
    }
  });
};

UserController.deleteUser = function (req, res) {
  const id = [req.params.id];
  User.delete(id, function (err, data) {
    if (err) handleResponse(req, res, 500);
    else if (data.affectedRows > 0) handleResponse(req, res, 204);
    else handleResponse(req, res, 404, null, "User Not Found");
  });
};

module.exports = UserController;
