// Data
const { Profile, User } = require("../db/models");

exports.fetchProfile = async (profileId, next) => {
  try {
    profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const foundProfile = req.profile;
    const foundUser = await User.findByPk(foundProfile.userId);
    const filteredProfile = {
      id: foundProfile.id,
      image: foundProfile.image,
      bio: foundProfile.bio,
      userId: req.profile.userId,
      username: foundUser.username,
    };
    res.json(filteredProfile);
  } catch (error) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    if (req.user.id === foundProfile.userId) {
      await foundProfile.update(req.body);
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
