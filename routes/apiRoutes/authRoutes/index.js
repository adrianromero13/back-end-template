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
 // can add function to check the role of user before allowing registration
 // in the case type where client wants users with certain roles to create user registration
 router.post('/register/:role', userAuth, async (req, res) => {
   await userRegister(req.body, res);
 })

 /**
  * @DESC router for logging in 
  */

  // users */api/auth
  router.post('/login/:role', async (req, res) => {
    await userLogin(req.body, res);
  })

module.exports = router;
