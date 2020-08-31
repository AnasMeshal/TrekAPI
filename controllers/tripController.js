//Data
const { Trip, User } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    // what's with the empty object being passed?
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
    // you don't need this line. just use req.user directly.
    // no need to find the user, you already have it in req.user
    const foundUser = await User.findByPk(req.user.id);
    // also no need to check permissions.
    // this line is like asking Mike if Mike is Mike then Mike can pass through
    // no need to check if Mike is Mike, because Mike is always Mike.
    // mike sense?
    if (req.user.id === foundUser.id) {
      req.body.userId = foundUser.id;
      // by adding this line above, you don't need to add the second object below with the userId.
      const newTrip = await Trip.create(req.body, {
        userId: req.body.userId,
      });
      res.status(201).json(newTrip);
      /**
       * Basically here, you don't need to check permissions, anyone logged in can create.
       */
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
      /*💥*/await /*💥*/req.trip./*💥*/destroy(/*💥*/);/*💥*/
      // you can delete these /*💥*/ above 👆 I'm just messing around
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
