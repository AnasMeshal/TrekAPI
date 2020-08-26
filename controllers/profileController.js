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
    // if (req.user.role === "admin" || req.user.id === req.profile.userId) {
    //   if (req.file) {
    //     req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
    //       "host"
    //     )}/media/${req.file.filename}`;
    //   }
    await req.profile.update(req.body);
    res.status(204).end();
    // } else {
    //   const error = new Error("Unauthorized");
    //   error.status = 401;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.profile.userId) {
      const foundProfile = await Profile.findOne({
        where: { userId: req.user.id },
      });
      req.body.profileId = foundProfile.id;
      const newTrip = await Trip.create(req.body, {
        profileId: req.body.profileId,
      });
      res.status(201).json(newTrip);
    } else {
      const error = new Error("Unauthorized");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
