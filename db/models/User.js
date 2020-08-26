const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "This username already exists",
      },
      validate: { notEmpty: true }, // doesn't allow empty string
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    firstName: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This email already exists",
      },
      validate: { isEmail: true },
    },
  },
  {
    sequelize: db,
  }
);

module.exports = User;
