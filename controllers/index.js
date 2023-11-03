const router = require('express').Router();

const apiRoutes = require('./api');
const playRoutes = require('./play-routes,js')

router.use('/', playRoutes);
router.use('/api', apiRoutes);

module.exports = router;