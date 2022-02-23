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
  
  it("testing if password field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({
        password:567 ,
        user_name: "",
        first_name: "",
        last_name: "",
        password: "",
        re_password:"",
        email: "",
        picture:""})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })

  it("testing if re_password field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({password:"567",re_password:456,email:"jhgbvftyhgb"})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })

  it("testing if email field isn't string", async() => {
    const attempt = await chai.request(server)
        .post('/register')
        .send({password:"567",re_password:"456",email:765876})
       attempt.should.have.status(500)
       attempt.should.be.json;
       attempt.should.have.property("text").eql('{"message":"All user properties must be a string"}')
  })
})

 
