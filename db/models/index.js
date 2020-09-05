const User = require("./User");
const Trip = require("./Trip");
const Profile = require("./Profile");
const List = require("./List");
const ListTrip = require("./ListTrip");

//Create a one to one relationship between the user and the profile
User.hasOne(Profile, { as: "profile", foreignKey: "userId" });
Profile.belongsTo(User, { as: "user" });

//Create a one to many relationship between the user and the list of the trips
User.hasMany(List, { as: "list", foreignKey: "userId" });
List.belongsTo(User, { as: "user" });

//Create a one to many relationship between the user and trips
User.hasMany(Trip, { as: "trips", foreignKey: "userId" });
Trip.belongsTo(User, { as: "user" });

//Create a many to many relationship between the trip and the list
List.belongsToMany(Trip, {
  through: ListTrip,
  foreignKey: "listId",
  as: "trips",
});
Trip.belongsToMany(List, {
  through: ListTrip,
  foreignKey: "tripId",
});

module.exports = {
  Trip,
  User,
  Profile,
  List,
  ListTrip,
};
