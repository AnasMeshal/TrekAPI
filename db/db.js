const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  // youre using the same PW and DB name, so this works out.
  // but you should remove PW and DB name before pushing, and
  // add them when you pull.
  // leave this for now, but im adding this comment for your info
  // on real life projects, you shouldn't push your DB PW to GitHub
  password: "Trek",
  database: "TrekDB",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
