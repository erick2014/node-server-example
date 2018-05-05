var Sequelize = require('sequelize');

var User = {
  name: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
}

module.exports = User;

