// modules required to run original index.js
const express = require ('express');
// to generate the paths between folders
const path = require('path');
// needed to connect to db
const { connect } = require('mongoose');
// consola makes the console feedback easier to read
const { success, error } = require('consola');
// required for checking cookie data
const passport = require('passport');


// require routes 
const routes = require('./routes');

// bring from config the required parameters
const { DB, PORT} = require('./config');
const { start } = require('repl');

// initialize app with express()
const app = express();

// set up the middlewares 
app.use(express.urlencoded({ extend: true }));
app.use(express.json()); // built in as a bodyparser
app.use(passport.initialize());

// check what environment system is running in 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/builid')));
}

// use routest to run application
app.use(routes);

// pass down passport services as parameter for middlewares
require('./middlewares/passport')(passport);

// start app connections
const startApp = async () => {
  // create the db connection
  try {
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    // use of consola to present message in console using badge
    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    })
    // start listening for server on specified port
    app.listen(PORT, () => 
    success({
      message: `Server started on PORT: ${PORT}`,
      badge: true,
    })
    );
  } catch (e) {
    error({
      message: `Unable to connect with the Database \n${e}`,
      badge: true,
    })
  }
};
startApp();
