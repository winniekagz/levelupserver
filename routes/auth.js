const express = require("express");
const router = express.Router();
const {  login,register,resetPassword, ForgotPassword, forgotPassword,} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);


router.route("/forgot-password").post(ForgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

module.exports = router;