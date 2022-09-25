// require express to move between routes
const router = require('express').Router();
// fetch apiRoutes components
const apiRoutes = require('./apiRoutes');

// start router
router.use('/api', apiRoutes);

// export to be used when router is called
module.exports = router;
