const express = require('express');
const corser = require('corser');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const app = express();
const getDbConfig = require('./utils/dbConnection')

// auth stuff
var auth = require('./Controllers/authController.js')

const sequelizeInstance = getDbConfig()

//authenticate to the db
sequelizeInstance
  .authenticate()
  .then((resp) => {
    console.log('connection has been established successfully');
    //remove x-powered-by from response( this is to improve performance a little bit in the server)
    app.disable('etag').disable('x-powered-by');
    //initialize body parser to receive parameters within a request
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse application/json
    app.use(bodyParser.json())
    //enable cors
    app.use(corser.create());

    //pass the sequelize instance through the request object
    app.use((req, res, next) => {
      req['db'] = sequelizeInstance;
      next();
    })

    //token validator middleware
    app.use(auth.tokenValidationMiddleware)
    //pass the sequelize instance through the request object
    app.use((req, res, next) => {
      req['db'] = sequelizeInstance;
      next();
    })

    // USERS ROUTE
    require('./routes/user')(app, sequelizeInstance);

    app.listen(4000);

    console.log('server running at localhost:4000')
  })
  .catch(err => {
    //set this flag to indicate that the connection is not available
    console.error('Unable to connect to the data base', err);
  });

//module.exports = app;
