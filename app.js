const express = require("express");

//Database
const db = require("./db");

const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

//Routes
const userRoutes = require("./routes/users");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const tripRoutes = require("./routes/trips");
const profileRoutes = require("./routes/profiles");

const app = express();

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use(userRoutes);
app.use("/trips", tripRoutes);
app.use("/profiles", profileRoutes);

//Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path not found");
  error.status = 404;
  next(error);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const run = async () => {
  try {
    await db.sync({
      alter: true,
    });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
