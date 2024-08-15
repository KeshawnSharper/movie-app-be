// const createServer = require('../server')
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// const { assert } = require('chai');
// let should = chai.should();
// chai.use(chaiHttp);

// const server = createServer()
// // // describe('/Users 404  error paths', () => {
// // //     it('POST Users', (done) => {
// // //       chai.request(server)
// // //           .post('/users')
// // //           .end((err, res) => {
// // //                 res.should.have.status(404)
// // //             done();
// // //           });
// // //     })
  
// // //     it('PUT Users', (done) => {
// // //       chai.request(server)
// // //           .put('/users')
// // //           .end((err, res) => {
// // //                 res.should.have.status(404)
// // //             done();
// // //           });
// // //     })
  
// // //     it('DELETE Users', (done) => {
// // //       chai.request(server)
// // //           .delete('/users')
// // //           .end((err, res) => {
// // //                 res.should.have.status(404)
// // //             done();
// // //           });
// // //     })
  
// // //     it('PATCH Users', (done) => {
// // //       chai.request(server)
// // //           .patch('/users')
// // //           .end((err, res) => {
// // //                 res.should.have.status(404)
// // //             done();
// // //           });
// // //     })
// // //   });

// // //   describe('/Users/path 404  error paths', () => {
// // //     it('POST Users', (done) => {
// // //       chai.request(server)
// // //           .post('/users/1')
// // //           .end((err, res) => {
// // //                 res.should.have.status(404)
// // //             done();
// // //           });
// // //     })
  
  
// // //     it('DELETE Users', (done) => {
// // //       chai.request(server)
// // //           .delete('/users/1')
// // //           .end((err, res) => {
// // //                 res.should.have.status(404)
// // //             done();
// // //           });
// // //     })
  
// // //     it('PATCH Users', (done) => {
// // //       chai.request(server)
// // //           .patch('/users/1')
// // //           .end((err, res) => {
// // //                 res.should.have.status(404)
// // //             done();
// // //           });
// // //     })
// // //   });


// describe('Check for users', async() => {
//     it('checks if users path return array', async() => {
//         const attempt = await chai.request(server)
//             .get('/users')
//            attempt.should.have.status(200)
//            attempt.should.be.json;
//            attempt.should.have.property("text")
//            JSON.parse(attempt.text).should.be.an("array")
//            JSON.parse(attempt.text).should.have.lengthOf.above(1)
//       })
// })

// describe('GET Users/{id}', async() => {
//     it('checks if users/{[]} return error', async() => {
//         const attempt = await chai.request(server)
//             .get('/users/[]')
//             attempt.should.have.status(500)
//             attempt.should.be.json;
//             attempt.should.have.property("text").eql('{"message":"Invalid User"}')
//       })
//       it('checks if users/{[]} return error', async() => {
//         const attempt = await chai.request(server)
//             .get('/users/abcs')
//             attempt.should.have.status(500)
//             attempt.should.be.json;
//             attempt.should.have.property("text").eql('{"message":"Invalid User"}')
//       })
//       it('checks if users/{[]} return error', async() => {
//         const attempt = await chai.request(server)
//             .get('/users/{}')
//             attempt.should.have.status(500)
//             attempt.should.be.json;
//             attempt.should.have.property("text").eql('{"message":"Invalid User"}')
//       })
//       it('checks for successful request return object with everything in user besides password', async() => {
//         const attempt = await chai.request(server)
//             .get('/users/6')
//             attempt.should.have.status(200)
//             attempt.should.be.json;
//             attempt.should.have.property("text").eql('{"last_name":"","first_name":"","id":"6","email":"test345@gmail.com","picture":"","user_name":""}')
//       })
// })
