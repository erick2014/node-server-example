module.exports = function (app, sequelizeInstance) {
  // user model
  const userModel = require('../Models/userModel');
  // user model instance
  const userModelInstance = sequelizeInstance.define('testUsers', userModel, { freezeTableName: true })
  const userCtrl = require('../Controllers/userController/userController')(userModelInstance);

  app.route('/user')
    .get(userCtrl.getUsers)
    .post(userCtrl.createUser)
    .delete(userCtrl.deleteUser)

  app.route('/user/auth')
    .post(userCtrl.authUser)

}
