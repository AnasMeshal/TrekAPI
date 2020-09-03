const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Trip extends Model {}

Trip.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Your title must not be empty" },
      },
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: "Your details must not be empty" },
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Trip;
