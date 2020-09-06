// Data
const { List, Trip, ListTrip } = require("../db/models");

exports.fetchList = async (listId, next) => {
  try {
    list = await List.findByPk(listId);
    return list;
  } catch (error) {
    next(error);
  }
};

exports.listList = async (req, res, next) => {
  try {
    const lists = await List.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Trip,
          attributes: ["id"],
          as: "trips",
          through: { attributes: [] },
        },
      ],
    });
    res.json(lists);
  } catch (error) {
    next(error);
  }
};

exports.listCreate = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    if (req.body.name !== "Want To Go") {
      const newList = await List.create(req.body);
      res.status(201).json(newList);
    } else {
      const err = new Error("You can't name the list like this");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.listUpdate = async (req, res, next) => {
  try {
    if (req.list.name !== "Want To Go") {
      await req.list.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("You can't update this list");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.listDelete = async (req, res, next) => {
  try {
    if (req.list.name !== "Want To Go") {
      await req.list.destroy();
      res.status(204).end();
    } else {
      const err = new Error("You can't delete this list");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.AddTripToList = async (req, res, next) => {
  try {
    const listTrip = await ListTrip.create({
      tripId: req.body.tripId,
      listId: req.list.id,
    });
    res.status(201).json(listTrip);
  } catch (error) {
    next(error);
  }
};

exports.DeleteTripFromList = async (req, res, next) => {
  try {
    const foundTrip = await ListTrip.findOne({
      where: { listId: req.list.id, tripId: req.trip.id },
    });

    if (foundTrip) {
      await foundTrip.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Trip Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
