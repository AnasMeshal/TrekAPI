const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller
const { profileUpdate } = require("../controllers/profileController");

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

module.exports = router;
