// fetch User module for mongoose parameters
const User = require('../models/User');
const { SECRET } = require('../config');
// fetch the functions from passport-jwt
const { Strategy, ExtractJwt } = require('passport-jwt');

// set up options
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: SECRET,
}


// export function as passport for use as functional component
module.exports = (passport) => {
  // use passport that was passed in as props for module.exports
  passport.use(
    new Strategy(options, async (payload, done) => {
      // check to see if user exists in the Header of token
      await User.findById(payload._id).then(user => {
        // if it does, then continue
        if (user) {
          return done(null, user);
        }
        // if it does not then return false which will fail process
        return done(null, false);
      }).catch((err) => {
        return done(null, false); // same if there is an error with the attempt
      });
    })
  )
}
