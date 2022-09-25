// bring in bcrypt from node_modules to use for hashing passwords
const bcrypt = require('bcryptjs');
// bring in jsonwebtokne for creating token for individual session
const jwt = require('jsonwebtoken');
// passport for using middleware with needed parameters
const passport = reuiqre('passport');

// bring in User module for following predetermined db architecture
const { User } = require('../models');
// bring in needed parameters from config
const { SECRET } = require('../config');

/**
 * @description. To register the user (admin, super_admin, user, supervisor)
 */

 // create userRegister function 
const userRegister = async (userDets, res) => {
  try {
    // validate username to see if it is available
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: 'Username is already taken.',
        success: false,
      });
    }
  } catch (e) {
    
  }
}