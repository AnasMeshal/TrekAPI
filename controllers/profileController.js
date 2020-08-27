//Data
const { Profile, Trip, User } = require("../db/models");

exports.fetchProfile = async (ProfileId, next) => {
  try {
    const profile = await Profile.findByPk(ProfileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    // REVIEW: It makes absolutely no sense what you're doing here. You're finding the profile from the database, saving it in the request and passing it back to the database. وبطتنا بطت بطن بطتكم
    req.profile = foundProfile;
    // REVIEW: This if condition is very weird. `findByPk` will obviously fetch the profile with this ID. What you need to check is if `foundProfile` exists. That's it
    if (req.user.id === foundProfile.userId) {
      await req.profile.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
