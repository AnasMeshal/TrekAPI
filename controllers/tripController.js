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

exports.tripUpdate = async (req, res, next) => {
  try {
    // if (req.user.id === req.trip.vendor.userId) {
    //   if (req.file) {
    //     req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
    //       "host"
    //     )}/media/${req.file.filename}`;
    //   }
    await req.trip.update(req.body);
    res.status(204).end();
    // } else {
    //   const err = new Error("Unauthorized");
    //   err.status = 404;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }
};

exports.tripDelete = async (req, res, next) => {
  try {
    //     if (req.user.id === req.trip.vendor.userId) {
    await req.trip.destroy();
    res.status(204).end();
    // } else {
    //   const err = new Error("Unauthorized");
    //   err.status = 404;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }
};
