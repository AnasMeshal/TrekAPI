const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


//Routes
const userRoutes = require("./routes/users");
const tripRoutes = require("./routes/trips");

//Database
const db = require("./db");

const app = express();

//Routers
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use("/trips", tripRoutes);

const run = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
