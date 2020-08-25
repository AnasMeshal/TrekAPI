//Data
const { Trip } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    trip = await Trip.findByPk(tripId, {
      //   include: {
      //     model: Vendor,
      //     as: "vendor",
      //     attributes: ["userId"],
      //   },
    });
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      //   include: {
      //     model: Vendor,
      //     as: "vendor",
      //     attributes: ["name"],
      //   },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    //   if (req.user.id === req.vendor.userId) {
    //     if (req.file) {
    //       req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
    //         "host"
    //       )}/media/${req.file.filename}`;
    //     }
    // req.body.vendorId = req.vendor.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
    //   } else {
    //     const err = new Error("Unauthorized");
    //     err.status = 401;
    //     next(err);
    //   }
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
