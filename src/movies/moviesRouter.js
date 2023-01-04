const router = require('express').Router();
const controller = require('./moviesController');
const methodNotAllowed  = require('../errors/methodNotAllowed');
const reviewRouter = require('../reviews/reviewsRouter')
const theaterRouter = require('../theaters/theatersRouter')

router.use('/:movieId/reviews',reviewRouter)
router.use('/:movieId/theaters',theaterRouter)

router.route('/').get(controller.list).all(methodNotAllowed)
router.route('/:movieId').get(controller.read).all(methodNotAllowed)


module.exports = router;