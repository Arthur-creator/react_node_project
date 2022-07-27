const Sequelize = require("sequelize");
require('dotenv').config();
const connection = new Sequelize(process.env.DATABASE_URL, {
  useNewUrlParser: true
});
console.log('log',connection);

connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = connection;
