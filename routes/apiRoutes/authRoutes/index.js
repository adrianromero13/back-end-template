// require express to create router connections
const router = require('express').Router();

// import needed controller functions
const {
  userAuth,
  userRegister,
} = require('../../../utils/auth');

/**
 * @DESC Router for Registering users with use of auth-related controller functions
 */

 // dynamc router for register new users
 router.post('/register/:role', userAuth, async (req, res) => {
   await userRegister(req.body, res);
 })