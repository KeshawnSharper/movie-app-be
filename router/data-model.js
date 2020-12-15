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
function deleteOrder(id){
  return db("orders").delete({"id":id})
}
function saveMovie(movie){
  return db("fav_movies").insert(movie)
}
function getMovies(id){
  return db("fav_movies").where({"user_id":id})
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
    getMovies
}


