//Data
const { Trip, User } = require("../db/models");

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
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    const foundUser = await User.findByPk(req.user.id);
    if (req.user.id === foundUser.id) {
      req.body.userId = foundUser.id;
      const newTrip = await Trip.create(req.body, {
        userId: req.body.userId,
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
    const foundUser = await User.findByPk(req.trip.userId);
    if (req.user.id === foundUser.id) {
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
    const foundUser = await User.findByPk(req.trip.userId);
    if (req.user.id === foundUser.id) {
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
