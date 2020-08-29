//Data
const { Profile } = require("../db/models");

exports.fetchProfile = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    res.json(foundProfile);
  } catch (error) {
    next(error);
  }
};

exports.fetchOtherProfile = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.body.userId },
    });
    res.json(foundProfile);
  } catch (error) {
    next(error);
  }
};

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
