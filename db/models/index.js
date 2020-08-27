const User = require("./User");
const Trip = require("./Trip");
const Profile = require("./Profile");

User.hasOne(Profile, { as: "profile", foreignKey: "userId" });
Profile.belongsTo(User, { as: "user" });

User.hasMany(Trip, { as: "trips", foreignKey: "userId" });
Trip.belongsTo(User, { as: "user" });

module.exports = {
  Trip,
  User,
  Profile,
};
