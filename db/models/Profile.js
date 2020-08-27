const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Profile extends Model {}

Profile.init(
  {
    image: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Profile;
