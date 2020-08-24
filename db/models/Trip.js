const { Datatypes, Model } = require("sequelize");
const db = require("../db");

class Trip extends Model {}

Trip.init({
  title: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  details: {
    type: DataTypes.STRING,
  },
});
