const express = require("express");
const passport = require("passport");

//Controllers
const {
  tripList,
  tripCreate,
  tripUpdate,
  tripDelete,
  fetchTrip,
} = require("../controllers/tripController");

const router = express.Router();

//Param
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip Not Found");
    err.status = 404;
    next(err);
  }
});

//List
router.get("/", tripList);

//Create
router.post("/", passport.authenticate("jwt", { session: false }), tripCreate);

//Update
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripUpdate
);

//Delete
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);

module.exports = router;
