const userHelpers = require('./userHelpers.js')

const userController = userModel => {
  return {
    authUser: (req, res, next) => {
      const response = userHelpers.authUser(req.body)
      if (response['error']) res.status(400).send(response);
      else res.send(response);
    },
    /* Create a new  user endpoint*/
    createUser: async (req, res, next) => {
      const db = req['db']
      // TODO Implement
      let response
      if (response && response['error']) res.status(400).send(response);
      else res.send(response);
    },
    deleteUser: async (req, res, next) => {
      const db = req['db']
      // TODO Implement
      let response
      if (response && response['error']) res.status(400).send(response);
      else res.send(response);
    },
    getUsers: async (req, res, next) => {
      const db = req['db']
      // TODO Implement
      let response = userHelpers.fetchUsers(userModel)
      if (response && response['error']) res.status(400).send(response);
      else res.send(response);
    },
  }
}

module.exports = userController
