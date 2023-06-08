const { Sequelize } = require("sequelize");
const { DB_URI } = require("./config");

const db = new Sequelize(DB_URI, { logging: false });

db.authenticate()
  .then(() => console.log("Connected to Database ✅"))
  .catch((err) => console.error("Error connecting to DB ❌ : ", err));

module.exports = { db };
