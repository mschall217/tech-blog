const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes')

router.use('/user-routes', userRoutes);
router.use('/post', postRoutes)

module.exports = router;