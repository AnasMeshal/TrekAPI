const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Profile extends Model {}

Profile.init(
  {
    image: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    bio: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Profile;
