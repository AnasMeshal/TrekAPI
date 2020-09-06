const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class List extends Model {}

List.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Your title must not be empty" },
      },
    },
  },
  {
    sequelize: db,
  }
);

module.exports = List;
