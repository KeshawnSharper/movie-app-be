const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const data = require('./data-model')
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const cors = require("cors")
const axios = require("axios")
const { v4: uuid } = require('uuid');
const nodemailer = require('nodemailer');
// router.use(cors({ origin: "*" }));
// router.use(bodyParser.json());
require('dotenv').config()
const AWS = require("aws-sdk");
const { response } = require('express');
const { del } = require('../data/dbConfig');
const { AWS_ACCESS, AWS_SECRET,AWS_REGION_ID} =
  process.env;
  console.log(AWS_REGION_ID)
  AWS.config.update({
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SECRET,
    region: AWS_REGION_ID
})
const dynamoDB = new AWS.DynamoDB.DocumentClient()
// A callback to save reccomended movies 
let newMovies = {}

let addRecommendations = async(movie) => {
  let obj = {}
  let userMovies = await scanDB("Movie-Application_recommended_movies",movie.userID,"userID")
  userMovies.map(item => obj[item.id] = true)
  console.log(obj)
  axios.get(`https://api.themoviedb.org/3/movie/${movie.movie_id}/recommendations?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=1`).then(async(res) => {
    res.data.results.map((result) => {
      console.log(result)
       let new_movie = {
      userID: movie.userID,
      id: `${result.id}`,
      title: result.title,
      poster_path: result.poster_path,
      vote_average: result.vote_average,
      overview: result.overview,
      recommended_movie_id: movie.id,
      release_date: result.release_date,
      runtime: result.runtime
  }
  if (obj[movie.id] !== true){
    console.log("bye")
    putDB("Movie-Application_recommended_movies", new_movie)
  }
  else{
    console.log("hello")
  }
    });
  })
  return scanDB("Movie-Application_recommended_movies",movie.userID,"userID")
}
// A callback function for quick calls to DYNAMODB, CALL IT WITH THE AWAIT KEYWORD

let scanDB = async (table,filterID,filterProp) => {
  let items = await dynamoDB.scan({TableName: table}).promise()
  items = items["Items"]
  if (filterID !== null){
    items = items.filter(item => item[`${filterProp}`] === filterID)

  }
  return items

}
let putDB = async (table,item) => {
  await scanDB(table,item,"recommended_movie_id")
  await dynamoDB.put({TableName: table,Item:item}).promise()
}
let deleteDB = async (table,id) => {
  await dynamoDB.delete({TableName: table,Key:{id:`${id}`}}).promise()
}
let editDB = async (table,id,body) => {
console.log(body)
let updateString = "set "
let UpdateExpressionObj= {}
for  (let [key, value] of Object.entries(body)) {
  updateString += `${key} = :${key},`
  UpdateExpressionObj[`:${key}`] = `${value}`
}
updateString = updateString.slice(0,-1)
  await dynamoDB.update({TableName: table,Key:{"id":id},UpdateExpression:updateString,ExpressionAttributeValues:UpdateExpressionObj}).promise()
}
router.use(cors());

router.post('/register', async(req, res) => {
  let user = req.body
  
  let userFound = await scanDB("Movie-Application-users",user.email,"email")
  if (userFound.length > 0){
    res.status(500).json({"message":"User already exists"})
  }
  else{
    let hash = bcrypt.hashSync(user.password,13)
    user.password = hash 
    delete user.re_password
    let users = await scanDB("Movie-Application-users")
    user.id = `${users.length + 1}`
    await putDB("Movie-Application-users",user)
    res.status(201).json({"message":"success"})
  }
})


router.post('/loginGoogle/:id', async(req, res) => {
let user = {
  id:req.params.id,
  user_name:null,
  password:null,
  type:"Google",
  picture:req.body.profileObj.imageUrl,
  email:req.body.profileObj.email,
  first_name:req.body.profileObj.givenName,
  last_name:req.body.profileObj.familyName
}

let userFound = await scanDB("Movie-Application-users",user.email,"email")
 if (userFound.length === 0){
  await putDB("Movie-Application-users",user)
  
 }
      const payload = {userid:req.params.id,username:req.body.profileObj.name}
      const options = {expiresIn:"1d"}
      user.token = jwt.sign(payload,"secret",options)
 res.status(201).json(user)
})
router.post('/loginFacebook/:id', (req, res) => {
  let user = {
    id:req.params.id,
    user_name:req.body.name,
    password:null,
    type:"Facebook",
    picture:req.body.picture.data.url,
    email:req.body.email,
    first_name:null,
    last_name:null
  }
  dynamoDB.scan({TableName:"Movie-Application-users"}, function(err, data) {
    if (err){
      console.log(err)
    }
    else{
      if (data["Items"].filter(item => item.id === req.params.id).length === 0){
       
        dynamoDB.put({TableName: "Movie-Application-users",Item:user},function(err,data){
          if (err){
            res.status(500)
          }
          else{
          console.log("HI")
        }
      })
    }
          const payload = {
            userid:req.params.id,
            username:req.body.name
          }
          const options = {
            expiresIn:"1d"
          }
          const token = jwt.sign(payload,"secret",options)
          user.token = token
          res.status(200).json(user)
    }
  })
  })
router.post('/login', async(req, res) => {
  let user = req.body
  console.log(user)
  let userFound = await scanDB("Movie-Application-users",user.email,"email")
 if (userFound.length === 0){
  res.status(501).json({"message":"User doesn't exist"})
 }
 userFound = userFound[0]
if (userFound && bcrypt.compareSync(user.password,userFound.password)){
    let loggedIn = {
    first_name: userFound.first_name,
    id: userFound.id,
    email: userFound.email,
    picture: userFound.picture,
    user_name: userFound.user_name,
    last_name:userFound.last_name
   }
        const payload = {userid:loggedIn.id,username:loggedIn.user_name}
        const options = {expiresIn:"1d"}
        loggedIn.token = jwt.sign(payload,"secret",options)
   res.status(201).json(loggedIn)
}
 else{
  res.status(500).json({message:`Invalid Credentials`})
 }
});
router.post('/saveMovie', async (req, res) => {
  let body = req.body
  let items = await scanDB("Movie-Application-fav-movies",body.userID,"userID")
  if (items.filter(item => item.movie_id === body.id).length > 0){
    res.status(500).json({"message":"Movie already saved for this user"})

    return
  }
  else{
  body.movie_id = body.id
  body.id = `${items.length + 1}`
  
  if (items.filter(item => item.id === body.id).length === 0){
  await putDB("Movie-Application-fav-movies",body)
  let recommendations = await addRecommendations(body)
  let movies = await scanDB("Movie-Application-fav-movies",body.userID,"userID")
  res.status(201).json({movies:movies,recommendations:recommendations})
  }
  else{
    res.status(500).json("Movie already exsists")
  }
}
})
router.get('/recommendedMovies/:id', (req, res) => {
  data.getRecommendedMovie(req.params.id)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.delete('/recommendedMovies/:recommended_movie_id/:user_id', (req, res) => {
  data.deleteRecommendedMovie(req.params.recommended_movie_id,req.params.user_id)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.post('/recommendedMovies', (req, res) => {
  let body = req.body
  console.log(body)
  data.saveRecommendedMovie(body)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.get('/savedMovies/:id', async(req, res) => {
  console.log(req.params.id)
  let recommendations = await scanDB("Movie-Application_recommended_movies",req.params.id,"userID")
  let movies = await scanDB("Movie-Application-fav-movies",req.params.id,"userID")
  res.status(200).json({movies:movies,recommendations:recommendations})
})
router.delete('/deleteMovie/:id/:user_id/:movie_id', async(req, res) => {
  let id = null
  console.log(req.params.id === "dont")
  if (req.params.id === "dont"){
    console.log(req.params.movie_id)
    let movies = await scanDB("Movie-Application-fav-movies",req.params.user_id,"userID")
    let delMovie = movies.filter(item => `${item.movie_id}` === `${req.params.movie_id}`)[0]
    id = delMovie.id
  }
  else{
    id = req.params.id
  }
  console.log(id)
  await deleteDB("Movie-Application-fav-movies",id,"id")
  let movies = await scanDB("Movie-Application-fav-movies",req.params.user_id,"userID")
  res.status(200).json({movies:movies,id:id})
})

router.get('/users', (req, res) => {
  data.getUsers()
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.get('/users/:id', async (req, res) => {
  let user = await scanDB("Movie-Application-users",req.params.id,"id")
 user  = user[0]
 delete user.password
res.status(201).json({"user":user})
})
router.put('/users/:id', async (req, res) => {
 await editDB("Movie-Application-users",req.params.id,req.body)
 let user = await scanDB("Movie-Application-users",req.params.id,"id")
 user  = user[0]
 delete user.password
res.status(201).json({"user":user})
})

router.post('/orders', (req, res) => {
  var today = new Date();
  req.body.delivered = false
  console.log('req.body',req.body)
  data.purchase(req.body)
  .then(project => {
    res.status(201).json(project)
  })
  .catch(err => {
    res.status(500).json({ message: err });
  });
})
router.get('/orders/:id', (req, res) => {
  console.log(req.params.id)
  data.getOrders(req.params.id)
  .then(project => {
    res.status(200).json(project)
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
})
router.post("/checkout", (req, res) => {
 

  
    const { product, token } = req.body;
    console.log("Request:", product);
    console.log("price:", product.price);
    const idempotencyKey = uuid();
    return stripe.customers.create({
      email: token.email,
      source: token.id
    }).then(
      customer => {
        stripe.charges.create(
          {
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
          },
          {
            idempotencyKey
          }
        );
      }
    )
    .then(project => {
      console.log("usd")
      res.status(200).json({status:"success"})})
    .catch(err => {
      res.status(500).json(console.log(err));
    });
 
})
router.delete('/orders/:id', (req, res) => {
  console.log(req.params.id)
  data.deleteOrder(req.params.id)
  .then(project => {
    res.status(200).json(project)
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
})
router.post('/email', (req, res) => {
  
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.example.com",
  //   port: 587,
  //   secure: false, // upgrade later with STARTTLS
  //   auth: {
  //     user: "ciara.pagac32@ethereal.email",
  //     pass: "fEfGBS1xK5FY9AssS"
  //   }
  // }); 
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ciara.pagac32@ethereal.email',
        pass: 'fEfGBS1xK5FY9AssSs'
    }
});
  //  console.log(body)
  var message = {
    from: "ciara.pagac32@ethereal.email",
    to: "ksharper@studentmba.org",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>"
  }
  transporter.sendMail(message)
})


module.exports = router
