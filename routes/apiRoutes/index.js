// require express to create router
const router = require('express').Router();

// import routes used
const authRoutes = require('./authRoutes');


// prepended routes
router.use('/auth', authRoutes);
module.exports = router;
