const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller
const {
  fetchProfile,
  profileUpdate,
  tripCreate,
} = require("../controllers/profileController");

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const error = new Error("Profile Not Found");
    error.status = 404;
    next(error);
  }
});

router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

router.post(
  "/:profileId/trips",
  passport.authenticate("jwt", { session: false }),
  tripCreate
);

module.exports = router;
