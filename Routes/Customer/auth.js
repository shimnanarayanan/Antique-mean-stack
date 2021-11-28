const express = require("express");
const router = new express.Router();

const authController = require("../../Controllers/Customer/authController");

router.route("/signup").post(authController.validate, authController.signup);
router.route("/verify").post(authController.otp);


router.route("/signin").post(authController.validate, authController.signin);

module.exports = router;
