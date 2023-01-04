const router = require('express').Router()
const controller = require('./theatersController')

router
  .route('/')
  .get(controller.list)

module.exports = router