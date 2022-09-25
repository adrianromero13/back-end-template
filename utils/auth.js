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

    // get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    const role = userDets.role;
    // create the new user using db template
    const newUser = new User({
      // this inclusive command allows to specify any component and includes all others not mentioned
      ...userDets,
      password,
      role,
    });
    await newUser.save();
    // return response from trycatch
    return res.status(201).json({
      message: 'You are now successfully registered. Please login',
      success: true,
    });
  } catch (e) {
    // logger function to see in console when error occurs in creation of user
    return res.status(500).json({
      data: {...userDets},
      message: 'Unable to create your account.',
      success: false,
    })
  }
};

// export functions using module.exports
module.exports = {
  userRegister,
};
