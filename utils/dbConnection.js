const Sequelize = require('sequelize');
// receive db connection params from environment variables
const { ENVIRONMENT, DB, DB_USER, DB_PASS } = process.env

const getDbHost = () => {
  const dbHost = (ENVIRONMENT === "production") ? 'localhost' : '8.8.8.8'
  return dbHost
}

const getDbConfig = () => {
  //get  sequelize instance with a connection to a db
  return new Sequelize(DB, DB_USER, DB_PASS, {
    dialect: 'mysql',
    host: getDbHost(),
    define: { freezeTableName: true, timestamps: false }
  })
}

module.exports = getDbConfig
