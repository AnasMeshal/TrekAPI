const express = require("express");

const db = require("./db");

const cors = require("cors");
const bodyParser = require("body-parser");

//Routes
const userRoutes = require("./routes/users");

const app = express();

//Routers
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);

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
