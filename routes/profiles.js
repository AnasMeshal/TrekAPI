const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controller
const {
  profileUpdate,
  getProfile,
  fetchProfile,
} = require("../controllers/profileController");

// Param
router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/:profileId", getProfile);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

module.exports = router;
