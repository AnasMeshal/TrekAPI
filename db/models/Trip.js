const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const sequelizeSlugify = require("sequelize-slugify/lib/sequelize-slugify");

class Trip extends Model {}

Trip.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: db,
  }
);

sequelizeSlugify.slugifyModel(Trip, {
  source: ["title"],
});

module.exports = Trip;
