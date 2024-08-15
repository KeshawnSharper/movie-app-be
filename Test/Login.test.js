// const createServer = require('../server')
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// const { assert } = require('chai');
// let should = chai.should();
// chai.use(chaiHttp);

// // // const globalTests = require("./router/Tests/globalTests")

// // // // create a unexisted properties string
// // // // create a wrong types string
// // // // has to check for property
// // //   // if property doesn't exist return a 
// // //   // if property exist has to check if property type matches 
// // //     // if property type doesn't match add it to the wrong types array
// // // // if wrong props or unexisted properties exist return a string with a message defining the errors

// // // // if user doesn't exists return 500 status with "user does'nt exists"
// // // // if user exists but the password is wrong return 500 error and "password is wrong"
// // // // if email isn't in email format return 500 error and "email does'nt exists"
// // //  //if password isnt a string return 500 error and "password is wrong"

// const server = createServer()

// describe('/Login 404  error paths', () => {
//     it('GET Login', (done) => {
//       chai.request(server)
//           .get('/login')
//           .end((err, res) => {
//                 res.should.have.status(404)
//             done();
//           });
//     })
  
//     it('PUT Login', (done) => {
//       chai.request(server)
//           .put('/login')
//           .end((err, res) => {
//                 res.should.have.status(404)
//             done();
//           });
//     })
  
//     it('DELETE Login', (done) => {
//       chai.request(server)
//           .delete('/login')
//           .end((err, res) => {
//                 res.should.have.status(404)
//             done();
//           });
//     })
  
//     it('PATCH Login', (done) => {
//       chai.request(server)
//           .patch('/login')
//           .end((err, res) => {
//                 res.should.have.status(404)
//             done();
//           });
//     })
//   });

//   describe('/POST Login: Checking for required fields', () => {
//     it('testing if empty body request sends an error', async() => {
//       const attempt = await chai.request(server)
//           .post('/login')
//           .send({})
//          attempt.should.have.status(500)
//          attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
//     })
//     it('testing if password isnt in the body, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({email: ""})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
//       })
//       it('testing if email isnt in the body, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: ""})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
//       })
// })
// describe('POST Login: Passwords checks', async () => {
//     it('testing if email is a number, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "",email: 1234})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//       })
//       it('testing if password is a number, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: 1234,email: "test@example.com"})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Password fields must be a string"}')
//       })
//       it('testing if password length is under 7, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "1234",email: "test@example.com"})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//       })
//       it('testing if password doesnt have numbers, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "fredKrugerisdead#",email: "test@example.com"})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//       })

//       it('testing if password doesnt have special characters, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "fredKrugerisdead09",email: "test@example.com"})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//       })
//       it('testing if password doesnt have upperCase characters, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "fredkrugerisdead09#",email: "test@example.com"})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//       })
// })
// describe('POST Login: Checking Email', async () => {
//     it('testing if email is an array, sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "fredkrugerisdead09#",email: ["test@example.com"]})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//       })

//       it('testing if email ends with ".org", sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "fredkrugerisdead09#",email: "test@example.org"})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//       })
//       it('testing if email ends with ".org", sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "fredkrugerisdead09#",email: "testexample.com"})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//       })
// })

// describe('Checking if an user exists',async() => {
//     it('Checking if an user exists", sends an error', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "fredKrugerisdead09#",email: "test@example.com"})
//            attempt.should.have.status(500)
//            attempt.should.be.json;
//            attempt.should.have.property("text").eql('{"message":"User doesnt exist"}')
//         })

//       it('Checking if an user exists", return a success', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "jgjuhhiouyhgfvbhjkoG6#",email: "test345@gmail.com"})
//            attempt.should.have.status(201)
//            attempt.should.be.json;
//       })
//       it('Checking if an user exists", return a success should be faster than the following', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "jgjuhhiouyhgfvbhjkoG6#",email: "test345@gmail.com"})
//            attempt.should.have.status(201)
//            attempt.should.be.json;
//       })
//       it('Checking if an user exists when some characters are capitalized, return a success should be faster than the following', async() => {
//         const attempt = await chai.request(server)
//             .post('/login')
//             .send({password: "jgjuhhiouyhgfvbhjkoG6#",email: "TesT345@gmail.com"})
//            attempt.should.have.status(201)
//            attempt.should.be.json;
//       })
// })