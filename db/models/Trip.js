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
      // i think you guys already have a default image
      // the default image should be set in here, not in FE.
      type: DataTypes.STRING,
      // allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: "Your details must not be empty" },
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Trip;
