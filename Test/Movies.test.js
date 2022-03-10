const createServer = require('../server')
let chai = require('chai');
let chaiHttp = require('chai-http');
const { assert } = require('chai');
let should = chai.should();
chai.use(chaiHttp);
let {
  scanDB,
}
= require('../router/basicConfig.js/basicConfig')
// // const globalTests = require("./router/Tests/globalTests")

// // create a unexisted properties string
// // create a wrong types string
// // has to check for property
//   // if property doesn't exist return a 
//   // if property exist has to check if property type matches 
//     // if property type doesn't match add it to the wrong types array
// // if wrong props or unexisted properties exist return a string with a message defining the errors

const server = createServer()
// let userMovies = await scanDB("Movie-Application-fav-movies","9","userID")
// console.log(userMovies.selected_items)
describe('/GET savedMovies/:id, Checking for existence', () => {

    it('testing if user does not exist', async() => {
      const attempt = await chai.request(server).get('/savedMovies/1000')
         attempt.should.have.status(500)
         attempt.should.have.property("text").eql('{"message":"User doesnt exist"}')

    })

    it('testing if user does exist', async() => {
      const attempt = await chai.request(server)
        .get('/savedMovies/1')
        attempt.should.have.status(200)
        JSON.parse(attempt.text).should.be.an("array")
        JSON.parse(attempt.text).should.have.lengthOf.above(0)

    })
})

describe('/GET savedMovies should return error', () => {
    it('testing if I can get all movies saved should return error', async() => {
      const attempt = await chai.request(server)
        .get('/savedMovies')
        attempt.should.have.status(404)
    })
})
describe('/DELETE movie', () => {
  it('checking if id exists', async() => {
    const attempt = await chai.request(server)
      .delete(`/savedMovies/5000000000000000000000`)
      attempt.should.have.status(500).have.property("text").eql('{"message":"Item doesnt exist"}')
  })
  it('checking if delete works', async() => {
    let testMovie = await scanDB("Movie-Application-fav-movies","9","userID")
    testMovie = testMovie.selected_items.filter(item => item.movie_id === "568124")[0]
    const attempt = await chai.request(server)
      .delete(`/savedMovies/${testMovie.id}`)
      attempt.should.have.status(200)
  })
})
describe('/POST savedMovies ', () => {
    // it('testing If I send a invalid user', async() => {
    //   const attempt = await chai.request(server)
    //     .post('/savedMovies')
    //     .send({movie_id:"476669",userID:"500"})
    //     console.log(attempt)
    //     attempt.should.have.status(500).eql('{"message":"User doesnt exist"}')
    // })
    it('testing If I send a movie without a movie ID property', async () => {
      const attempt = await chai.request(server)
        .post('/savedMovies')
        .send({
                  "original_title": "Encanto",
                  "genre_ids": [
                      16,
                      35,
                      10751,
                      14
                  ],
                  "adult": false,
                  "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
                  "vote_average": 7.8,
                  "popularity": 3218.518,
                  "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
                  "release_date": "2021-11-24",
                  "original_language": "en",
                  "userID": "9",
                  "vote_count": 4351,
                  "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
                  "video": false,
                  "title": "Encanto"
              })
              attempt.should.have.status(500).have.property("text").eql('{"message":"Missing key properties"}')
    })
    it('testing If I send a movie without a genre_ids property', async () => {
      const attempt = await chai.request(server)
        .post('/savedMovies')
        .send({
                  "movie_id": "568124",
                  "original_title": "Encanto",
                  "adult": false,
                  "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
                  "vote_average": 7.8,
                  "popularity": 3218.518,
                  "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
                  "release_date": "2021-11-24",
                  "original_language": "en",
                  "userID": "9",
                  "vote_count": 4351,
                  "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
                  "video": false,
                  "title": "Encanto"
              })
              attempt.should.have.status(500).have.property("text").eql('{"message":"Missing key properties"}')
    })
    it('testing If I send a movie without a adult property', async () => {
      const attempt = await chai.request(server)
        .post('/savedMovies')
        .send({
                  "movie_id": "568124",
                  "original_title": "Encanto",
                  "genre_ids": [
                      16,
                      35,
                      10751,
                      14
                  ],
                  "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
                  "vote_average": 7.8,
                  "popularity": 3218.518,
                  "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
                  "release_date": "2021-11-24",
                  "original_language": "en",
                  "userID": "9",
                  "vote_count": 4351,
                  "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
                  "video": false,
                  "title": "Encanto"
              })
              attempt.should.have.status(500).have.property("text").eql('{"message":"Missing key properties"}')
    })
    it('testing If I send a movie without a genre_ids being a string', async () => {
      const attempt = await chai.request(server)
        .post('/savedMovies')
        .send({
                  "movie_id": "568124",
                  "original_title": "Encanto",
                  "genre_ids": "hello",
                  "adult":false,
                  "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
                  "vote_average": 7.8,
                  "popularity": 3218.518,
                  "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
                  "release_date": "2021-11-24",
                  "original_language": "en",
                  "userID": "9",
                  "vote_count": 4351,
                  "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
                  "video": false,
                  "title": "Encanto"
              })
              attempt.should.have.status(500).have.property("text").eql('{"message":"genre_ids must be a array"}')
    })
     it('testing If I send a invalid user', async() => {
      const attempt = await chai.request(server)
        .post('/savedMovies')
        .send({
          "movie_id": "568124",
          "original_title": "Encanto",
          "genre_ids": [
            16,
            35,
            10751,
            14
        ],
          "adult":false,
          "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
          "vote_average": 7.8,
          "popularity": 3218.518,
          "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
          "release_date": "2021-11-24",
          "original_language": "en",
          "userID": "500",
          "vote_count": 4351,
          "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
          "video": false,
          "title": "Encanto"
      })
        attempt.should.have.status(500).have.property("text").eql('{"message":"User doesnt exist"}')
    })
    it('testing If I send a invalid movie', async() => {
      const attempt = await chai.request(server)
        .post('/savedMovies')
        .send({
          "movie_id": "1000000000000000000000000000000000",
          "original_title": "Encanto",
          "genre_ids": [
            16,
            35,
            10751,
            14
        ],
          "adult":false,
          "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
          "vote_average": 7.8,
          "popularity": 3218.518,
          "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
          "release_date": "2021-11-24",
          "original_language": "en",
          "userID": "9",
          "vote_count": 4351,
          "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
          "video": false,
          "title": "Encanto"
      })
        attempt.should.have.status(500).have.property("text").eql('{"message":"Movie does not exist"}')
    })
    it('UNCOMMENT AND DELETE id of 4: testing for a successful attempt', async() => {
      const attempt = await chai.request(server)
        .post('/savedMovies')
        .send({
          "movie_id": "568124",
          "original_title": "Encanto",
          "genre_ids": [
            16,
            35,
            10751,
            14
        ],
          "adult":false,
          "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
          "vote_average": 7.8,
          "popularity": 3218.518,
          "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
          "release_date": "2021-11-24",
          "original_language": "en",
          "userID": "9",
          "vote_count": 4351,
          "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
          "video": false,
          "title": "Encanto"
      })
        attempt.should.have.status(201)
        
    })
    it('UNCOMMENT: testing if movie already exist', async() => {
      const attempt = await chai.request(server)
        .post('/savedMovies')
        .send({
          "movie_id": "568124",
          "original_title": "Encanto",
          "genre_ids": [
            16,
            35,
            10751,
            14
        ],
          "adult":false,
          "overview": "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
          "vote_average": 7.8,
          "popularity": 3218.518,
          "backdrop_path": "/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
          "release_date": "2021-11-24",
          "original_language": "en",
          "userID": "9",
          "vote_count": 4351,
          "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
          "video": false,
          "title": "Encanto"
      })
      console.log(attempt.text)
        attempt.should.have.status(500)
    })
})
