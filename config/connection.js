//import the squalize constructor from the library
const Sequelize = require('sequelize')
//create connection to the database pass in your MySql information for username and password 
require('dotenv').config()
// All we need it to do here is execute when we use connection.js and all of the data in the .env file will be made available at process.env.<ENVIRONMENT-VARIABLE-NAME>.

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}
module.exports = sequelize;

// All we're doing here is importing the base Sequelize class and using it to create a new connection to the database. 
// The new Sequelize() function accepts the database name, MySQL username, and MySQL password (respectively) as parameters,
//  then we also pass configuration settings. Once we're done, we simply export the connection.