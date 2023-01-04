const service = require("./moviesService");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function list(req,res){
  const data = await service.list(req.query.is_showing)
  res.json({ data })
  
}
async function movieIdExist(req,res,next){
  const movie = await service.read(req.params.movieId);
   
  if(movie){
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, error: "Movie cannot be found"})
}

async function read(req,res) {
  res.json({ data: res.locals.movie})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieIdExist), read],
};