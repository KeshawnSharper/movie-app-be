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
let addRecommendations = async(movie) => {
  axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=bab5bd152949b76eccda9216965fc0f1&language=en-US&page=1`).then(async(res) => {
    res.data.results.map((result) => {
       let new_movie = {
      userId: movie.userID,
      id: `${result.id}`,
      title: result.title,
      poster_path: result.poster_path,
      vote_average: result.vote_average,
      overview: result.overview,
      recommended_movie_id: movie.id,
      release_date: result.release_date
  }
     putDB("Movie-Application_recommended_movies", new_movie)
    });
  })
  return scanDB("Movie-Application_recommended_movies",movie.userID,"userID")
}
// A callback function for quick calls to DYNAMODB, CALL IT WITH THE AWAIT KEYWORD

let scanDB = async (table,filterID,filterProp) => {
  let items = await dynamoDB.scan({TableName: table}).promise()
  items = items["Items"]
  if (filterID !== null){
    items.filter(item => item[`${filterProp}`] === filterID)
  }
  return items

}
let putDB = async (table,item) => {
  await dynamoDB.put({TableName: table,Item:item}).promise()
}

router.use(cors());

router.post('/register', (req, res) => {
  console.log(req.body)
  let user = req.body
  let hash = bcrypt.hashSync(user.password,13)
  user.password = hash 
  data.register(user)
  .then(project => {
    res.status(201).json(project)
   })
.catch(err => {
res.status(500).json({ message: 'Failed to get schemes' })
})

})


router.post('/loginGoogle/:id', (req, res) => {
console.log(req.body)
let user = {
  id:req.params.id,
  user_name:req.body.user_name,
  password:null,
  type:"Google",
  picture:req.body.profileObj.imageUrl,
  email:req.body.profileObj.email,
  first_name:req.body.profileObj.givenName,
  last_name:req.body.profileObj.familyName
}
dynamoDB.scan({TableName: "Movie-Application-users"}, function(err, data) {
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
          username:req.body.profileObj.name
        }
        const options = {
          expiresIn:"1d"
        }
        const token = jwt.sign(payload,"secret",options)
        res.status(200).json({email:req.body.profileObj.email,token:token,id:req.params.id,user_name:req.body.profileObj.name})
  }
})
})
router.post('/loginFacebook/:id', (req, res) => {
  console.log(req.body)
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
router.post('/login', (req, res) => {
  let body = req.body
  console.log(body)
  data.login(body)
  .first()
  .then(user => {
    console.log(user)
    const payload = {
      userid:user.id,
      username:user.username
    }
    const options = {
      expiresIn:"1d"
    }
    const token = jwt.sign(payload,"secret",options)
    if (user && bcrypt.compareSync(body.password,user.password))
    {res.status(200).json({email:body.email,token:token,userid:user.id,first_name:user.first_name,last_name:user.last_name,user_name:user.user_name})}
   else {
     res.status(404).json({message:`invalid creditinials`})
   }
  })
  .catch(err => {
    res.status(500).json({ message: err })
    console.log(err)
  });
});
router.post('/saveMovie', async (req, res) => {
  let body = req.body
  console.log(body)
  let items = await scanDB("Movie-Application-fav-movies",body.userID,"userID")
  let recc
  console.log(items)
  body.id = `${body.id}`
  if (items.filter(item => item.id === body.id).length === 0){
  await putDB("Movie-Application-fav-movies",body)
  let recommendations = await addRecommendations(body)
  let movies = await scanDB("Movie-Application-fav-movies",body.userID,"userID")
  res.status(201).json({movies:movies,recommendations:recommendations})
  }
  else{
    res.status(200).json("Movie already exsists")
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
router.get('/savedMovies/:id', (req, res) => {
  data.getMovies(req.params.id )
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.delete('/deleteMovie/:movie_id/:id', (req, res) => {
  console.log(req.params.movie_id,req.params.id)
  data.deleteMovie(req.params.movie_id,req.params.id)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
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
router.get('/users/:id', (req, res) => {
  data.getUser(req.params.id)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
})
router.put('/users', (req, res) => {
  let body = req.body
  console.log(body)
  data.edit(body)
.then(data => {
  res.status(200).json(data);
})
.catch(err => {
  res.status(500).json({ message: 'Failed to get projects' });
})
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
