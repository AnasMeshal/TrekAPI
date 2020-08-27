const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: "Your username must not be empty" },
      unique: {
        args: true,
        msg: "This username already exists",
      },
      validate: {
        notEmpty: { args: true, msg: "Your username must not be empty" },
      }, // doesn't allow empty string
    },
    password: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: "Your password must not be empty" },
      validate: {
        notEmpty: { args: true, msg: "Your password must not be empty" },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: "Your first name must not be empty" },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: "Your last name must not be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This email already exists",
      },
      validate: {
        isEmail: { args: true, msg: "Your email must not be empty" },
      },
    },
  },
  {
    sequelize: db,
  }
);

module.exports = User;
