const express = require("express");
const passport = require("passport");

// Controllers
const {
  fetchList,
  listList,
  listCreate,
  listUpdate,
  listDelete,
  AddTripToList,
  DeleteTripFromList,
} = require("../controllers/listController");
const { fetchTrip } = require("../controllers/tripController");

const router = express.Router();

// Param
router.param("listId", async (req, res, next, listId) => {
  const list = await fetchList(listId, next);
  if (list) {
    req.list = list;
    next();
  } else {
    const err = new Error("List Not Found");
    err.status = 404;
    next(err);
  }
});

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  console.log("trip", trip);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip Not Found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", listList);

// Create
router.post("/", passport.authenticate("jwt", { session: false }), listCreate);

// Update
router.put(
  "/:listId",
  passport.authenticate("jwt", { session: false }),
  listUpdate
);

// Delete
router.delete(
  "/:listId",
  passport.authenticate("jwt", { session: false }),
  listDelete
);

// Add a trip to the list
router.post(
  "/:listId/trips",
  passport.authenticate("jwt", { session: false }),
  AddTripToList
);

router.delete(
  "/:listId/trips/:tripId",
  passport.authenticate("jwt", { session: false }),
  DeleteTripFromList
);

module.exports = router;
