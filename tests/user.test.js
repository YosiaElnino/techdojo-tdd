const request = require('supertest')
const app = require('../app')

describe('Test endpoint POST /login', () => {
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

  it("Test login wrong email", (done) => {
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

  it("Test login wrong password", (done) => {
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