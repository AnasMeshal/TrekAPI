const User = require("./User");
const Trip = require("./Trip");
const Profile = require("./Profile");

User.hasOne(Profile, { as: "profile", foreignKey: "userId" });
Profile.belongsTo(User, { as: "user" });

Profile.hasMany(Trip, { as: "trips", foreignKey: "profileId" });
Trip.belongsTo(Profile, { as: "profile" });

module.exports = {
  Trip,
  User,
  Profile,
};
