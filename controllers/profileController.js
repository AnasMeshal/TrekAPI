//Data
const { Profile, Trip, User } = require("../db/models");

exports.profileUpdate = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    req.profile = foundProfile;
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
