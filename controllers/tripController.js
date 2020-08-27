//Data
const { Trip, Profile } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    trip = await Trip.findByPk(tripId, {});
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Profile,
        as: "profile",
        attributes: ["userId"],
      },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    // REVIEW: This if condition is very weird. `findByPk` will obviously fetch the profile with this ID. What you need to check is if `foundProfile` exists. That's it
    if (req.user.id === foundProfile.userId) {
      req.body.profileId = foundProfile.id;
      // REVIEW: You're passing `create` two objects, it should be one object only
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

exports.tripUpdate = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findByPk(req.trip.profileId);
    // REVIEW: This if condition is very weird. `findByPk` will obviously fetch the profile with this ID. What you need to check is if `foundProfile` exists. That's it
    if (req.user.id === foundProfile.userId) {
      await req.trip.update(req.body);
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

exports.tripDelete = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findByPk(req.trip.profileId);
    // REVIEW: This if condition is very weird. `findByPk` will obviously fetch the profile with this ID. What you need to check is if `foundProfile` exists. That's it
    if (req.user.id === foundProfile.userId) {
      await req.trip.destroy();
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
