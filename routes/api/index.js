const router = require('express').Router();

const PizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', PizzaRoutes);

router.use('/comments', commentRoutes);

module.exports = router;