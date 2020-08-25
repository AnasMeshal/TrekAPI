const express = require("express");

const db = require("./db/db");

const app = express();

//Routes
const userRoutes = require("./routes/users");

//Routers
app.use(userRoutes);

const run = async () => {
  try {
    await db.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
