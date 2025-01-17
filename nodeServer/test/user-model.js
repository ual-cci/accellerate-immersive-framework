process.env.NODE_ENV = 'test';

let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let server = require('../server');
let userModel = require('../user-model');
let should = chai.should();

chai.use(chaiHttp);
let accountId;

let getToken = (username = "test-user", password = "somethingsecure")=> {
  return new Promise((resolve, reject)=> {
    chai.request(server)
      .post('/oauth/token')
      .type('form')
      .send({
        client_id:"application",
        client_secret:"secret",
        grant_type:"password",
        username:username,
        password:password
      })
      .end((err, res)=> {
        console.log("ENDING SIGNING IN", err, res.body)
        if(err)
        {
          reject(err)
        }
        else if (res.body.error)
        {
          reject(res.body)
        }
        else
        {
          // assert.equal(res.body.token_type, "Bearer");
          // assert.exists(res.body.access_token);
          // res.should.have.status(200);
          resolve(res.body.access_token);
        }
      });
  })
}


let newUser = ()=> {
  return new Promise((resolve, reject)=> {
    chai.request(server)
        .post('/accounts')
        .send({data:{attributes:{ username: 'test-user', password: 'somethingsecure', email:"something@test.com"}}})
        .end((err, res) => {
          console.log("MAKING A NEW USER");
          assert.equal("test-user", res.body.data.attr.username)
          assert.exists(res.body.data.attr.created);
          assert.exists(res.body.data.attr.password);
          assert.exists(res.body.data.attr.accountId);
          accountId = res.body.data.attr.accountId;
          res.should.have.status(200);
          console.log("MADE A NEW USER");
          resolve();
        });
  })
}

module.exports = {
  getToken:getToken
}

describe('users', () => {

  describe('/GET token with bad password', () => {
    it('it should reject a user with bad password and give appropriate feedback', (done)=> {
      newUser().then(()=> {
        console.log("signing in")
        getToken(username = "test-user", password = "somethingincorrect").catch((err)=> {
          console.log("BAD PASSWORD", err)
          assert.equal(err.error_description, 'password not correct')
          done();
        });
      });
    });
    after((done)=> {
      userModel.dropUser(accountId).then(()=> {
        accountId = "";
        done()
      });
    });
  });

  describe('/GET token with nonexistant user', () => {
    it('it should reject a user that doesnt exist and give appropriate feedback', (done)=> {
      newUser().then(()=> {
        console.log("signing in")
        getToken(username = "no-test-user").catch((err)=> {
          console.log("BAD USER", err)
          assert.equal(err.error_description, 'user not found')
          done();
        });
      });
    });
    after((done)=> {
      userModel.dropUser(accountId).then(()=> {
        accountId = "";
        done()
      });
    });
  });

  describe('/POST user', () => {
    it('it should create a new user with no errors', (done) => {
      newUser.then(done());
    });
    after((done)=> {
      userModel.dropUser(accountId).then(()=> {
        accountId = "";
        done()
      });
    });
  });

  describe('/POST user same name', () => {
    it('it should return 400 because the user name already exists', (done) => {
      newUser().then(()=> {
        chai.request(server)
            .post('/accounts')
            .send({data:{attributes:{ username: "test-user", password: "somethingsecure", email:"something@test.com"}}})
            .end((err, res) => {
              console.log(res.body);
              res.should.have.status(400);
              done();
            });
      }).catch((err)=>{
        console.log(err);
      });
    });
    after((done)=> {
      userModel.dropUser(accountId).then(()=> {
        accountId = "";
        done()
      });
    });
  });

  describe('/GET user', () => {
    before((done)=> {
      newUser().then(done);
    });
    it('it should get the users ID from the name, and should NOT return passwords or emails', (done) => {
      console.log("making get request")
      chai.request(server)
          .get('/accounts')
          .query({username: 'test-user'})
          .end((err, res) => {
            console.log("GOT USER", res.body.data.attr);
            assert.equal("test-user", res.body.data.attr.username)
            assert.isNull(res.body.data.attr.created);
            assert.equal("", res.body.data.attr.password);
            assert.equal(accountId, res.body.data.attr.accountId);
            res.should.have.status(200);
            done();
          });
    });
    after((done)=> {
      userModel.dropUser(accountId).then(()=> {
        accountId = "";
        done()
      });
    });
  });


});
