const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "Trek",
  database: "TrekDB",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
