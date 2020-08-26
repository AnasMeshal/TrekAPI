const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Profile extends Model {}

Profile.init(
  {},
  {
    sequelize: db,
  }
);

module.exports = Profile;
