const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Database
const db = require("./db");

//Routes
const tripRoutes = require("./routes/trips");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/trips", tripRoutes);

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
