const db = require('../data/dbConfig');

function getUsers() {
  return db("users")
}
function getGoogleUser(id) {
  return db("users").where({"google_id":id})
}
function getFacebookUser(id) {
  return db("users").where({"facebook_id":id})
}

function getInfo(id){
    return db("users").where({"id":id})
}

function updateInfo(data) {
  return db("users").where({id:data.id}).update(data)
   
}
function register(user){
  return db("users").insert(user)
  }
  function login(user)
 { 
     return db("users").where({"email":user.email})
 }
 function loginGoogle(id){
  return db("users").where({"google_id":id})
}
function loginFacebook(id){
  return db("users").where({"facebook_id":id})
}
function getOrders(order){
  return db("orders").where({"user_id":order})
}
function deleteMovie(movie_id,id){
  return db("fav_movies").where({"movie_id":movie_id,"user_id":id}).delete()
}
function edit(user){
  return db("users").where({"id":user.id}).update(user)
}
function saveMovie(movie){
  return db("fav_movies").insert(movie)
}
function getMovies(id){
  return db("fav_movies").where({"user_id":id})
}function getUser(id){
  return db("users").where({"id":id})
}
function saveRecommendedMovie(movie){
  return db("recommended_movies").insert(movie)
}
function getRecommendedMovie(id){
  return db("recommended_movies").where({"user_id":id})
}
function deleteRecommendedMovie(recommended_movie_id,user_id){
  return db("recommended_movies").where({"recommended_movie_id":recommended_movie_id,"user_id":user_id}).delete()
}
module.exports = {
  
    register,
    getFacebookUser,
    login,
    getUsers,
    getGoogleUser,
    loginGoogle,
    loginFacebook,
    saveMovie,
    getMovies,
    deleteMovie,
    getUser,
    saveRecommendedMovie,
    getRecommendedMovie,
    deleteRecommendedMovie,
    edit
}


