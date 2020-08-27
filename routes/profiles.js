const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller
const {
  fetchProfile,
  profileUpdate,
} = require("../controllers/profileController");

// router.param("profileId", async (req, res, next, profileId) => {
//   const profile = await fetchProfile(profileId, next);
//   if (profile) {
//     req.profile = profile;
//     next();
//   } else {
//     const error = new Error("Profile Not Found");
//     error.status = 404;
//     next(error);
//   }
// });

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

module.exports = router;
