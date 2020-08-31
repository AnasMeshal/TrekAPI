//Data
const { Profile } = require("../db/models");

// you don't need an API endpoint (which means a route and controller) for retrieving a Profile object
// just send it in the sign in token's payload.
// i wrote this as a comment in the signin controller.
exports.fetchProfile = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
      include: {
        model: User,
        as: "user",
        attributes: ["username", "firstName", "lastName"],
      },
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
    // you don't need to store foundProfile in req
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
