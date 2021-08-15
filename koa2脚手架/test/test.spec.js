import app from '../src/app';
import supertest from 'supertest'

const request = supertest.agent(app.listen())

describe('Test Open API', function () {
  it('should be "{status : test}"', function (done) {
    request
      .get('/open/test')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect({'status' : 'done'})
      .end(function(err, res) {
          if(err) return done(err)
          done()
      })
  })
})


describe('Test Auth API', function() {
  it('should not auth', function(done) {
    request
      .get('/api/app')
      .expect(200)
      .expect({'status' : 401})
      .end(function(err, res) {
        if(err) return done(err)
        done()
      })
  })

  it('should login success', function(done) {
    request
      .post('/auth/login')
      .send({'username':'test', 'password':'test'})
      .expect(200)
      .expect({'user':{'id':1, 'username':'test', 'password':'test'}})
      .end(function(err, res) {
        if(err) return done(err)
        done()
      })
  })

   it('should auth', function(done) {
    request
      .get('/api/app')
      .expect(200)
      .expect({'status' : 'app'})
      .end(function(err, res) {
        if(err) return done(err)
        done()
      })
  })
})
