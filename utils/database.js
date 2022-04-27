const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "qwerty12345",
  database: "appointments",
});

module.exports = { db };
