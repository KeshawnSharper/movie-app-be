const createServer = require('../server')
let chai = require('chai');
let chaiHttp = require('chai-http');
const { assert } = require('chai');
let should = chai.should();
chai.use(chaiHttp);

// const globalTests = require("./router/Tests/globalTests")

// create a unexisted properties string
// create a wrong types string
// has to check for property
  // if property doesn't exist return a 
  // if property exist has to check if property type matches 
    // if property type doesn't match add it to the wrong types array
// if wrong props or unexisted properties exist return a string with a message defining the errors

const server = createServer()

describe('/Register 404  error paths', () => {
  it('GET Register', (done) => {
    chai.request(server)
        .get('/register')
        .end((err, res) => {
              res.should.have.status(404)
          done();
        });
  })

  it('PUT Register', (done) => {
    chai.request(server)
        .put('/register')
        .end((err, res) => {
              res.should.have.status(404)
          done();
        });
  })

  it('DELETE Register', (done) => {
    chai.request(server)
        .delete('/register')
        .end((err, res) => {
              res.should.have.status(404)
          done();
        });
  })

  it('PATCH Register', (done) => {
    chai.request(server)
        .patch('/register')
        .end((err, res) => {
              res.should.have.status(404)
          done();
        });
  })
});
describe('/POST Register: Checking for required fields', () => {
  it('testing if empty body request sends an error', async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({})
       attempt.should.have.status(500)
  })

  it('testing if only the email field are in request body would work', async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({email: 'test@example.com'})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
  })

  it('testing if only the email and password fields are in request body would fail', async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({email: 'test@example.com',password:"dxcfvgbhjhuygtfrdes"})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
  })

  it('testing if only the password field are in request body would fail', async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({password:"dxcfvgbhjhuygtfrdes"})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
  })

  it('testing if only the re_password field are in request body would fail', async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({re_password:"dxcfvgbhjhuygtfrdes"})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
  })

  it('testing if only the email and re_password fields are in request body would fail', async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({email: 'test@example.com',re_password:"dxcfvgbhjhuygtfrdes"})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
  })

  it('testing if only the password and re_password fields are in request body would fail', async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({password:'-poiuhghjklopoiuhyg',re_password:"dxcfvgbhjhuygtfrdes"})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"Missing key properties"}')
  })
})

describe('/POST Register: Checking the field types', async() => {
  
  it("testing if Password field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({
        password:567 ,
        user_name: "",
        first_name: "",
        last_name: "",
        re_password:"",
        email: "",
        picture:""})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })

  it("testing if Re_Password field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({
          password:"" ,
          user_name: "",
          first_name: "",
          last_name: "",
          re_password:457,
          email: "",
          picture:""})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })

  it("testing if Email field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({
          password:"" ,
          user_name: "",
          first_name: "",
          last_name: "",
          re_password:"",
          email: 23,
          picture:""})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })
  it("testing if First Name field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({
          password:"" ,
          user_name: "",
          first_name: null,
          last_name: "",
          re_password:"",
          email: "",
          picture:""})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })

  it("testing if Last Name field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({
          password:"567" ,
          user_name: "",
          first_name: "",
          last_name: [],
          re_password:"",
          email: "",
          picture:""})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })

  it("testing if Picture field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({
          password:"567" ,
          user_name: "",
          first_name: 23,
          last_name: "",
          re_password:"",
          email: "",
          picture:{}})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })

  it("testing if User Name field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({
          password:"" ,
          user_name: false,
          first_name: "",
          last_name: "",
          re_password:"",
          email: "",
          picture:""})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })
})

 
