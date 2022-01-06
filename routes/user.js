const express = require("express");
const router = express.Router();

const { signup, signin, signout, forgotPassword, resetPassword, getLoggedInUserDetails, updatePassword, updateUserDetails } = require("../controllers/userController")
const { isLoggedIn, customRole } = require("../middlewares/user");
// user routes
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/signout").get(signout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);
router.route("/password/update").post(isLoggedIn, updatePassword);
router.route("/userdashboard/update").post(isLoggedIn, updateUserDetails);


module.exports = router;
