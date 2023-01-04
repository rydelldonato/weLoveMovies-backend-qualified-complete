const service = require('./reviewsService');
const methodNotAllowed = require('../errors/methodNotAllowed');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function reviewExists(req,res,next){
  const {reviewId} = req.params
  const review = await service.read(reviewId)
  if(review){
    res.locals.review = review
    return next()
  }
  next({status:404,message:`Review cannot be found`})
}
async function list(req,res){
  const data = await service.list(req.params.movieId)
  res.json({data})
}

function hasNoId(req,res,next){
  if(req.params.movieId){
   return methodNotAllowed(req,res,next)
  }
   next()
}

async function destroy(req,res){
  await service.delete(req.params.reviewId)
  res.sendStatus(204)
}

async function update(req,res){
  const newReview = { 
    ...res.locals.review,
    ...req.body.data
    }
    
  const data = await service.update(newReview)
    res.json({data})
}

module.exports = {
  destroy: [hasNoId,asyncErrorBoundary(reviewExists),asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
  update:[hasNoId,asyncErrorBoundary(reviewExists),asyncErrorBoundary(update)]
}