const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controller
const {
  fetchProfile,
  profileUpdate,
  fetchOtherProfile,
} = require("../controllers/profileController");

// delete this
// more comments in profileController.js
router.get("/", passport.authenticate("jwt", { session: false }), fetchProfile);

//should it be post??
// no it should be a get
// also, profile ID should be a URL parameter
router.post("/", fetchOtherProfile);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

module.exports = router;
