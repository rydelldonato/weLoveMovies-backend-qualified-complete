const knex = require('../db/connection');

async function list(movie_id){
  return knex('reviews')
  .where({movie_id})
  .then(reviews=>Promise.all(
reviews.map(addCritic)))
//the purpose of the .then method above is to add the critics information from the critics table
//at this point 'reviews' is an array of promises, which we can resolve with Promise.all
//we are using a map function to modify the 'reviews' data with our 'addCritic' function
}
async function readCritic(critic_id){
  return knex('critics')
  .where({critic_id})
  .first()
  //given the 'critic_id' from the addCritic function, this function will find the information of this specifc critic within the critics table from the database
  //returning the first item in this array of data to the addCritic function
}
async function addCritic(review){
  review.critic = await readCritic(review.critic_id)
  return review
  //taking in a single review object from the array of reviews,we are overwriting the 'review.critic' key to equal whatever 'readCritic' function returns
  //finally, we are returning this new modified review back to the list function
}
function read(review_id){
  return knex('reviews')
  .where({review_id})
  .first()
}
function destroy(reviewId){
  return knex('reviews')
  .where('review_id',reviewId)
  .del()
}
function update(review){
  return knex('reviews')
  .where({review_id:review.review_id})
  .update(review)
  .returning('*')
  .then(()=>read(review.review_id))
  .then(addCritic)
}

module.exports = {
  delete:destroy,
  list,
  read,
  update
}