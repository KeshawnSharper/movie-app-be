// const createServer = require('../server')
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// const { assert } = require('chai');
// let should = chai.should();
// chai.use(chaiHttp);

// // // const globalTests = require("./router/Tests/globalTests")

// // // create a unexisted properties string
// // // create a wrong types string
// // // has to check for property
// //   // if property doesn't exist return a 
// //   // if property exist has to check if property type matches 
// //     // if property type doesn't match add it to the wrong types array
// // // if wrong props or unexisted properties exist return a string with a message defining the errors

// const server = createServer()

// // describe('/Register 404  error paths', () => {
// //   it('GET Register', (done) => {
// //     chai.request(server)
// //         .get('/register')
// //         .end((err, res) => {
// //               res.should.have.status(404)
// //           done();
// //         });
// //   })

// //   it('PUT Register', (done) => {
// //     chai.request(server)
// //         .put('/register')
// //         .end((err, res) => {
// //               res.should.have.status(404)
// //           done();
// //         });
// //   })

// //   it('DELETE Register', (done) => {
// //     chai.request(server)
// //         .delete('/register')
// //         .end((err, res) => {
// //               res.should.have.status(404)
// //           done();
// //         });
// //   })

// //   it('PATCH Register', (done) => {
// //     chai.request(server)
// //         .patch('/register')
// //         .end((err, res) => {
// //               res.should.have.status(404)
// //           done();
// //         });
// //   })
// // });
// describe('/POST Register: Checking for required fields', () => {
//   it('testing if empty body request sends an error', async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({})
//        attempt.should.have.status(500)
//   })

//   it('testing if only the email field are in request body would work', async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({email: 'test@example.com'})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
//   })

//   it('testing if only the email and password fields are in request body would fail', async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({email: 'test@example.com',password:"dxcfvgbhjhuygtfrdes"})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").to.satisfy(res => res === '{"message":"Missing key properties"}' || res === '{"message":"Password not secure enough"}')
//   })

//   it('testing if only the password field are in request body would fail', async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({password:"dxcfvgbhjhuygtfrdes"})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
//   })

//   it('testing if only the re_password field are in request body would fail', async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({re_password:"dxcfvgbhjhuygtfrdes"})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
//   })

//   it('testing if only the email and re_password fields are in request body would fail', async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({email: 'test@example.com',re_password:"dxcfvgbhjhuygtfrdes"})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
//   })

//   it('testing if only the password and re_password fields are in request body would fail', async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({password:'-poiuhghjklopoiuhyg',re_password:"dxcfvgbhjhuygtfrdes"})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
//   })
// })

// describe('/POST Register: Checking the field types', async() => {


// //   it("testing if Email field isn't string", async() => {
// //     const attempt = await chai.request(server)
// //         .post('/register')
// //         .send({
// //           password:"jgjuhhiouyhgfvbhjkoG6#",
// //           user_name: "",
// //           first_name: "",
// //           last_name: "",
// //           re_password:"jgjuhhiouyhgfvbhjkoG6#",
// //           email: 23,
// //           picture:""})
// //        attempt.should.have.status(500)
// //        attempt.should.be.json;
// //        attempt.should.have.property("text").eql('{"message":"Email not valid"}')
// //   })
//   it("testing if First Name field isn't string", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"jgjuhhiouyhgfvbhjkoG6#" ,
//           user_name: "",
//           first_name: null,
//           last_name: "",
//           re_password:"jgjuhhiouyhgfvbhjkoG6#",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"first_name must be a string"}')
//   })

//   it("testing if Last Name field isn't string", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"jgjuhhiouyhgfvbhjkoG6#" ,
//           user_name: "",
//           first_name: "",
//           last_name: [],
//           re_password:"jgjuhhiouyhgfvbhjkoG6#",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"last_name must be a string"}')
//   })

//   it("testing if Picture field isn't string", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"jgjuhhiouyhgfvbhjkoG6#" ,
//           user_name: "",
//           first_name: "23",
//           last_name: "",
//           re_password:"jgjuhhiouyhgfvbhjkoG6#",
//           email: "test@example.com",
//           picture:{}})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"picture must be a string"}')
//   })

//   it("testing if User Name field isn't string", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"jgjuhhiouyhgfvbhjkoG6#" ,
//           user_name: false,
//           first_name: "",
//           last_name: "",
//           re_password:"jgjuhhiouyhgfvbhjkoG6#",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"user_name must be a string"}')
//   })
// })

// describe('/POST Register: Checking if the password security', async() => {
//   it("Checking if the password and re_password fields arent the same", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"jgjuhhiouyhgfvbhjkoG6#",
//           user_name: false,
//           first_name: "",
//           last_name: "",
//           re_password:"jgjuhhiouyhgfvbhjkoG6#tgfvbhjuytgf",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"password and re_password must be the same"}')
//   })

//   it("Checking if the password and re_password are the same but not 7 characters or more", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"123",
//           user_name:"",
//           first_name: "",
//           last_name: "",
//           re_password:"123",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//   })

//   it("Checking if the password and re_password are the same but don't have special characters", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"fredKruger123",
//           user_name:"",
//           first_name: "",
//           last_name: "",
//           re_password:"fredKruger123",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//   })

//   it("Checking if the password and re_password are the same but don't have upper case characters", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"fredkruger123@",
//           user_name:"",
//           first_name: "",
//           last_name: "",
//           re_password:"fredkruger123@",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//   })

//   it("Checking if the password and re_password are the same but don't have lower case characters", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"FREDKRUGER123@",
//           user_name:"",
//           first_name: "",
//           last_name: "",
//           re_password:"FREDKRUGER123@",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//   })

//   it("Checking if the password and re_password are the same but are only number characters", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"123456789",
//           user_name:"",
//           first_name: "",
//           last_name: "",
//           re_password:"123456789",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//   })

//   it("Checking if the password and re_password are the same but have no number characters", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"fredKrugerisdead#",
//           user_name:"",
//           first_name: "",
//           last_name: "",
//           re_password:"fredKrugerisdead#",
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Password not secure enough"}')
//   })
//   it("Checking if the password and re_password are the same but have no number characters", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:[1,2,2,3,4,5,6,7,8,9,10,11,12],
//           user_name:"",
//           first_name: "",
//           last_name: "",
//           re_password:[1,2,2,3,4,5,6,7,8,9,10,11,12],
//           email: "test@example.com",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Password fields must be a string"}')
//   })
// })

// describe('/POST Register: Checking if the email is valid ', async() => { 
//   it("Checking if the email is blank", async() => {
//     const attempt = await chai.request(server)
//         .post('/register')
//         .send({
//           password:"jgjuhhiouyhgfvbhjkoG6#",
//           user_name:"",
//           first_name: "",
//           last_name: "",
//           re_password:"jgjuhhiouyhgfvbhjkoG6#",
//           email: "",
//           picture:""})
//        attempt.should.have.status(500)
//        attempt.should.be.json;
//        attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//   })

//     it("Checking if the email is an array", async() => {
//       const attempt = await chai.request(server)
//           .post('/register')
//           .send({
//             password:"jgjuhhiouyhgfvbhjkoG6#",
//             user_name:"",
//             first_name: "",
//             last_name: "",
//             re_password:"jgjuhhiouyhgfvbhjkoG6#",
//             email: [1,2,2,3,4,5,6,7,8,9,10,11,12],
//             picture:""})
//          attempt.should.have.status(500)
//          attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//     })

//     it("Checking if the email is an object", async() => {
//       const attempt = await chai.request(server)
//           .post('/register')
//           .send({
//             password:"jgjuhhiouyhgfvbhjkoG6#",
//             user_name:"",
//             first_name: "",
//             last_name: "",
//             re_password:"jgjuhhiouyhgfvbhjkoG6#",
//             email: {},
//             picture:""})
//          attempt.should.have.status(500)
//          attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//     })

//     it("Checking if the email is a string, has @ but no .com", async() => {
//       const attempt = await chai.request(server)
//           .post('/register')
//           .send({
//             password:"jgjuhhiouyhgfvbhjkoG6#",
//             user_name:"",
//             first_name: "",
//             last_name: "",
//             re_password:"jgjuhhiouyhgfvbhjkoG6#",
//             email: "test@example.org",
//             picture:""})
//          attempt.should.have.status(500)
//          attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//     })

//     it("Checking if the email is a string, has .com but no @", async() => {
//       const attempt = await chai.request(server)
//           .post('/register')
//           .send({
//             password:"jgjuhhiouyhgfvbhjkoG6#",
//             user_name:"",
//             first_name: "",
//             last_name: "",
//             re_password:"jgjuhhiouyhgfvbhjkoG6#",
//             email: "testexample.com",
//             picture:""})
//          attempt.should.have.status(500)
//          attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"Email not valid"}')
//     })

//   })


  
//   describe('/POST Register: Checking if user exists', async() => {
//     it("Checking if the email exists", async() => {
//       const attempt = await chai.request(server)
//           .post('/register')
//           .send({
//             password:"jgjuhhiouyhgfvbhjkoG6#",
//             user_name:"",
//             first_name: "",
//             last_name: "",
//             re_password:"jgjuhhiouyhgfvbhjkoG6#",
//             email: "test@gmail.com",
//             picture:""})
//          attempt.should.have.status(500)
//          attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"User already exists"}')
//     })
//   })

//   describe('/POST Register: Checking for successful registration', async() => {
//     it("Checking if the success is 201", async() => {
//       const attempt = await chai.request(server)
//           .post('/register')
//           .send({
//             password:"jgjuhhiouyhgfvbhjkoG6#",
//             user_name:"",
//             first_name: "",
//             last_name: "",
//             re_password:"jgjuhhiouyhgfvbhjkoG6#",
//             email: "test345@gmail.com",
//             picture:""})
//          attempt.should.have.status(201)
//          attempt.should.be.json;
//          attempt.should.have.property("text").eql('{"message":"success"}')
//     })
//   })


// // // // what happens on a successful registration


 
