const express = require("express");
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

//Update
router.put("/:tripId", tripUpdate);

//Delete
router.delete("/:tripId", tripDelete);

module.exports = router;
