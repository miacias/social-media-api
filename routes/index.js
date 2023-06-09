const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use((req, res) => {
    return res.send('Route is incorrect. Please try again.')
});

module.exports = router;