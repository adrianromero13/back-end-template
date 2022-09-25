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


// validate username function 
const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
}

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

/**
 * @DESC To login the user 
 */

 // set login function
 const userLogin = async (userCreds, res) => {
   // pull components from userCreds to use directly
   let { username, password, role } = userCreds;
   // check if username is in the database
   const user = await User.findOne({ username });
   // if not, fail the login attempt
   if (!user) {
     return res.status(404).json({
       message: 'Username is not found. Invalid login credentials',
       success: false,
     });
   }
   // find a way to return protected route based on user's role

   // check password validity
   let isMatch = await bcrypt.compare(password, user.password);
   // if it does match then issue the token
   if (isMatch) {
     let token = jwt.sign(
       // set key valued pairs to match in token and an expiration and the key for further security
       {
         _id: user._id,
         role: user.role,
         username: user.username,
       }, SECRET, { expiresIn: '7 days'}
     );
     // set the result with the token
     let result = {
       username: user.username,
       role: user.role,
       token: `Bearer ${token}`,
       expiresIn: 168,
     };
     // send the results for use by user's environment
     return res.status(200).json({
       ...result,
       message: 'You successfully logged in',
       success: true,
     });

   } else {
     // if password does not match, fail and let user know
     return res.status(403).json({
       message: 'Wrong password',
       success: false,
     });
   };
 }

// export functions using module.exports
module.exports = {
  userRegister,
  userLogin,
};
