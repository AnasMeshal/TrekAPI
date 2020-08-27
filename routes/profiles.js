const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller
const {
  fetchProfile,
  profileUpdate,
} = require("../controllers/profileController");

router.get("/", passport.authenticate("jwt", { session: false }), fetchProfile);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

module.exports = router;
