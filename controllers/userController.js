const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.create(payload)
      res.status(201).json({
        msg: "User is created"
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const option = {
        where: { email }
      }
      const user = await User.findOne(option)
      if (!user) {
        throw { msg: 'Wrong email or password', status: 401 }
      } else if (!comparePassword(password, user.password)) {
        throw { msg: 'Wrong email or password', status: 401 }
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          access_token,
          email: user.email,
          role: user.role
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController