const expect = require('expect');
const request = require('supertest')
//const {ObjectID} = require('mongodb');
const {app} = require('../../app.js');
const {User} = require('../../models/user');

const {users,populateUsers} = require('../../models/seedData/userSeed');
// Wipes and repopulates test database
beforeEach(populateUsers);

// Testing registration API
describe('POST /api/register', () => {
  it('should register user with valid username and password', (done) => {
    // Creating userdata
    var body = {
      username: 'createUser',
      password: 'StR0NgPaSsW0rD'
    };
    // Sending to API
    request(app)
      .post('/api/user/register')
      .send(body)
      .expect(201)
      .end((err) => {
        if (err) {
          return done(err);
        }
        // Testing if its stored in the database
        var username = body.username;
        User.findOne({
          username
        }).then((user) => {
          expect(user).not.toBeFalsy();
          expect(user.password).not.toBe(body.password)
          expect(user.salt).not.toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  }).timeout(5000);

  it('should NOT passwith with invalid username', (done) => {
    var body = {
      username: '',
      password: 'otherPassword'
    };
    
    request(app)
      .post('/api/user/register')
      .send(body)
      .expect(400)
      .end(done);
  });

  it('should NOT pass with invalid password', (done) => {
    
    var body = {
      username: 'johnTheSecond',
      password: ''
    };
    
    request(app)
      .post('/api/user/register')
      .send(body)
      .expect(400)
      .end(done);
  });

  it('should NOT store user if username already exists in DB', (done) => {
    
    var body = {
      username: users.username,
      password: 'irrelevantPassword'
    };

    request(app)
      .post('/api/user/register')
      .send(body)
      .expect(400)
      .end(done);
  });
});

describe('POST /api/login',()=>{
  it('should return a JWT if user is registered',()=>{

  });

  it('should NOT return JWT if user is not found',()=>{

  });

  it('should NOT return anything if request is invalid',()=>{

  });
});
describe('POST /api/profile',()=>{
  it('should let an authorized user into a protected route',()=>{

  });
  it('should NOT let an unauthorized user into a protected route',()=>{

  });
})
describe('GET /api/user/logout',()=>{
  it('should delete the token for an authenticated user',()=>{

  });
  it('should NOT delete token from user if tokens do not match',()=>{

  });
  it('should NOT delete token if user was never authenticated',()=>{
    
  })
})