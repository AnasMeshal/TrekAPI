const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller
const {
  fetchProfile,
  profileUpdate,
  fetchOtherProfile,
} = require("../controllers/profileController");

router.get("/", passport.authenticate("jwt", { session: false }), fetchProfile);

//should it be post??
router.post("/", fetchOtherProfile);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

module.exports = router;
