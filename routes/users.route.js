const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const sendemail = require("../controllers/email.controller");
const authMiddleware = require("../middlewares/auth");

//upload product
router.post(
  "/upload",
  authMiddleware.ensureGuest,
  userController.uploadUserProduct
);

//receive mail
router.post("/sendmail", authMiddleware.ensureGuest, sendemail.sendMessage);

//geting all users
router.get("/", authMiddleware.ensureGuest, userController.getAllUsers);

//getting users by id
router.get("/:id", authMiddleware.ensureGuest, userController.getCurrentUser);

//upload profile pics
router.post(
  "/profile",
  authMiddleware.ensureGuest,
  userController.userUploadPic
);

//delete user
router.delete(
  "/delete/:id",
  authMiddleware.ensureGuest,
  userController.deleteUser
);

module.exports = router;
