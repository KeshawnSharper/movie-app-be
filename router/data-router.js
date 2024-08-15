// const express = require('express');
// const router = express.Router();
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const multer = require("multer")
// const axios = require("axios")
// const { v4: uuid } = require('uuid');
// const nodemailer = require('nodemailer');
// const {scanDB} = require('./awsFunctions')
// const storage = require('node-sessionstorage')
// // router.use(bodyParser.json());
// require('dotenv').config()
// const AWS = require("aws-sdk");
// const { response } = require('express');
// const { del } = require('../data/dbConfig')
// const { AWS_ACCESS, AWS_SECRET,AWS_REGION_ID} =
//   process.env;
//   AWS.config.update({
//     accessKeyId: AWS_ACCESS,
//     secretAccessKey: AWS_SECRET,
//     region: AWS_REGION_ID
// })
// const globalFunctions = require('./globalFunctions')
// const {checkUser,checkAWSCreds,checkGlobalUser,getPrimitiveType} = globalFunctions

// const dynamoDB = new AWS.DynamoDB.DocumentClient()
// // A callback to save reccomended movies 
// let newMovies = {}


// // A callback function for quick calls to DYNAMODB, CALL IT WITH THE AWAIT KEYWORD
// // the scanDB function must return an array 
//   // the first argumment must be a string
//     // if the first argument's table string doesn't exist then return an error 
//   // the second argument can be anything 
//   // The last argument must be string 
//   // if the item doesn't exist in the database then return "Item doesn't exist"
// // let scanDB = async (table,filterID,filterProp) => {
  
// //   await dynamoDB.scan({TableName: table}).promise()
// //   .then(res => res.json())
// //   .then(res => console.log(res))
// //   .catch(err => {
// //     console.log("hello")
// //     console.log(err.code)
// //   }
// //     )
// //   // if (typeof table !== 'string'){
// //   //   return `Table name isn't a string it's a ${typeof table}`
// //   // }
// //   // let items = await dynamoDB.scan({TableName: table}).promise()
// //   // items = items["Items"]
// //   // if (filterID !== null){
// //   //   items = items.filter(item => item[`${filterProp}`] === filterID)
// //   // }
// //   // return items
// // }
// let putDB = async (table,item) => {
//   await scanDB(table,item,"recommended_movie_id")
//   await dynamoDB.put({TableName: table,Item:item})
// }
let deleteDB = async (table,id) => {
  await dynamoDB.delete({TableName: table,Key:{id:`${id}`}})
}
// let editDB = async (table,id,body) => {
// console.log(body)
// let updateString = "set "
// let UpdateExpressionObj= {}
// for  (let [key, value] of Object.entries(body)) {
//   updateString += `${key} = :${key},`
//   UpdateExpressionObj[`:${key}`] = `${value}`
// }
// updateString = updateString.slice(0,-1)
//   await dynamoDB.update({TableName: table,Key:{"id":id},UpdateExpression:updateString,ExpressionAttributeValues:UpdateExpressionObj}).promise()
// }
// console.log(AWS_REGION_ID,AWS_ACCESS,AWS_SECRET)

// // router.get('/register', (req, res) => {
// // res.sendStatus(400)
// // })


// router.post('/loginGoogle/:id', async(req, res) => {
// let user = {
//   id:req.params.id,
//   user_name:null,
//   password:null,
//   type:"Google",
//   picture:req.body.profileObj.imageUrl,
//   email:req.body.profileObj.email.toLowerCase(),
//   first_name:req.body.profileObj.givenName,
//   last_name:req.body.profileObj.familyName
// }

// let userFound = await scanDB("Movie-Application-users",user.email,"email")
//  if (userFound.length === 0){
//   await putDB("Movie-Application-users",user)
  
//  }
//       const payload = {userid:req.params.id,username:req.body.profileObj.name}
//       const options = {expiresIn:"1d"}
//       user.token = jwt.sign(payload,"secret",options)
//  res.status(200).json(user)
// })
// // 

// router.post('/saveMovie', async (req, res) => {
//   let body = req.body
//   let items = await scanDB("Movie-Application-fav-movies",body.userID,"userID")
//   if (items.filter(item => item.movie_id === body.id).length > 0){
//     res.status(500).json({"message":"Movie already saved for this user"})

//     return
//   }
//   else{
//   body.movie_id = body.id
//   body.id = `${items.length + 1}`
  
//   if (items.filter(item => item.id === body.id).length === 0){
//   await putDB("Movie-Application-fav-movies",body)
//   let recommendations = await addRecommendations(body)
//   let movies = await scanDB("Movie-Application-fav-movies",body.userID,"userID")
//   res.status(200).json({movies:movies,recommendations:recommendations})
//   }
//   else{
//     res.status(500).json("Movie already exsists")
//   }
// }
// })
// router.get('/recommendedMovies/:id', (req, res) => {
//   data.getRecommendedMovie(req.params.id)
// .then(data => {
//   res.status(200).json(data);
// })
// .catch(err => {
//   res.status(500).json({"message": 'Failed to get projects' });
// })
// })
// router.delete('/recommendedMovies/:recommended_movie_id/:user_id', (req, res) => {
//   data.deleteRecommendedMovie(req.params.recommended_movie_id,req.params.user_id)
// .then(data => {
//   res.status(200).json(data);
// })
// .catch(err => {
//   res.status(500).json({ "message": 'Failed to get projects' });
// })
// })
// router.post('/recommendedMovies', (req, res) => {
//   let body = req.body
//   console.log(body)
//   data.saveRecommendedMovie(body)
// .then(data => {
//   res.status(200).json(data);
// })
// .catch(err => {
//   res.status(500).json({ "message": 'Failed to get projects' });
// })
// })
// router.get('/savedMovies/:id', async(req, res) => {
//   console.log(req.params.id)
//   let recommendations = await scanDB("Movie-Application_recommended_movies",req.params.id,"userID")
//   let movies = await scanDB("Movie-Application-fav-movies",req.params.id,"userID")
//   res.status(200).json({movies:movies,recommendations:recommendations})
// })
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
  res.status(200).json({"movies":movies,"id":id})
})


// router.post('/orders', (req, res) => {
//   var today = new Date()
//   req.body.delivered = false
//   console.log('req.body',req.body)
//   data.purchase(req.body)
//   .then(project => {
//     res.status(200).json(project)
//   })
//   .catch(err => {
//     res.status(500).json({ message: err });
//   });
// })
// router.get('/orders/:id', (req, res) => {
//   console.log(req.params.id)
//   data.getOrders(req.params.id)
//   .then(project => {
//     res.status(200).json(project)
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to get schemes' });
//   });
// })
// router.post("/checkout", (req, res) => {
 

  
//     const { product, token } = req.body;
//     console.log("Request:", product);
//     console.log("price:", product.price);
//     const idempotencyKey = uuid();
//     return stripe.customers.create({
//       email: token.email,
//       source: token.id
//     }).then(
//       customer => {
//         stripe.charges.create(
//           {
//             amount: product.price * 100,
//             currency: "usd",
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `Purchased the ${product.name}`,
//             shipping: {
//               name: token.card.name,
//               address: {
//                 line1: token.card.address_line1,
//                 line2: token.card.address_line2,
//                 city: token.card.address_city,
//                 country: token.card.address_country,
//                 postal_code: token.card.address_zip
//               }
//             }
//           },
//           {
//             idempotencyKey
//           }
//         );
//       }
//     )
//     .then(project => {
//       console.log("usd")
//       res.status(200).json({status:"success"})})
//     .catch(err => {
//       res.status(500).json(console.log(err));
//     });
 
// })
// router.delete('/orders/:id', (req, res) => {
//   console.log(req.params.id)
//   data.deleteOrder(req.params.id)
//   .then(project => {
//     res.status(200).json(project)
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to get schemes' });
//   });
// })
// router.post('/email', (req, res) => {
  
//   // let transporter = nodemailer.createTransport({
//   //   host: "smtp.example.com",
//   //   port: 587,
//   //   secure: false, // upgrade later with STARTTLS
//   //   auth: {
//   //     user: "ciara.pagac32@ethereal.email",
//   //     pass: "fEfGBS1xK5FY9AssS"
//   //   }
//   // }); 
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'ciara.pagac32@ethereal.email',
//         pass: 'fEfGBS1xK5FY9AssSs'
//     }
// });
//   //  console.log(body)
//   var message = {
//     from: "ciara.pagac32@ethereal.email",
//     to: "ksharper@studentmba.org",
//     subject: "Message title",
//     text: "Plaintext version of the message",
//     html: "<p>HTML version of the message</p>"
//   }
//   transporter.sendMail(message)
// })


// module.exports = router
