const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

afterAll(done => {
  queryInterface.bulkDelete("Users")
    .then(() => { done() })
    .catch(err => { done() })
})

describe('Test endpoint POST user', () => {
  it('Test register success', (done) => {
    request(app)
      .post('/register')
      .send({
        email: 'admin@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('msg', 'User is created')
        done()
      })
  })

  it('Test register error - no email', (done) => {
    request(app)
      .post('/register')
      .send({
        password: '1234'
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Email is required')
        done()
      })
  })
  
  it('Test login success', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'admin@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it("Test login error - wrong email", (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'notadmin@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Wrong email or password')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it("Test login error - wrong password", (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'admin@mail.com',
        password: '123456'
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Wrong email or password')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})