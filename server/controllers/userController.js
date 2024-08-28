const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const transporter = require('../middleware/transporter')
const fs = require('fs')
const handlebars = require('handlebars')
require('dotenv').config()

module.exports = {
  userLogin: async (req, res) => {
    try {
      let userLogin
      const { password } = req.query

      if (req.query.username) {
        const { username } = req.query
        userLogin = await User.findOne({
          where: {
            username: username
          }
        })
      }

      if (userLogin == null) {
        return res.status(409).send({
          message: 'User not found'
        })
      }

      const isValid = await bcrypt.compare(password, userLogin.password)
      if (!isValid) {
        return res.status(400).send({
          message: 'Incorrect password'
        })
      }

      //data yang mau disimpan di token
      let payload = { id: userLogin.id }

      if (userLogin.isVerified === true) {
        if (userLogin.isEnabled === true) {
          if (req.query.rememberme === 'true') {
            const token = jwt.sign(payload, process.env.KEY_JWT)
            res.status(200).send({
              message: 'Login success',
              userLogin,
              token
            })
          } else {
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '3h' })
            res.status(200).send({
              message: 'Login success',
              userLogin,
              token
            })
          }
        } else {
          return res.status(400).send({
            message: 'This account is disabled. Please contact your admin.'
          })
        }
      } else {
        return res.status(400).send({
          message: 'Your account is not verified.'
        })
      }
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  addUser: async (req, res) => {
    try {
      const { username, email, password } = req.body

      //check if user already exist
      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: email }]
        }
      })

      //if user isn't already exist
      if (findUser == null) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const result = await User.create({
          username: username,
          email: email,
          password: hashPassword,
          isVerified: false,
          isAdmin: false,
          isEnabled: true
        })

        let payload = { id: result.id }
        const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '24h' })
        const data = fs.readFileSync('./template_verify.html', 'utf-8')
        const tempCompile = await handlebars.compile(data)
        const tempResult = tempCompile({ username: username, link: `http://localhost:3000/verify/${token}` })

        await transporter.sendMail({
          from: 'vadittolk@gmail.com',
          to: email,
          subject: 'CashHere - Account Verification',
          html: tempResult
        })
      } else {
        return res.status(400).send({ message: 'User already exist' })
      }
      res.status(200).send({ message: 'Register Success' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  addAdmin: async (req, res) => {
    try {
      const { username, email, password } = req.body

      //check if user already exist
      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: email }]
        }
      })

      //if user isn't already exist
      if (findUser == null) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const result = await User.create({
          username: username,
          email: email,
          password: hashPassword,
          isVerified: true,
          isAdmin: true,
          isEnabled: true
        })
      } else {
        return res.status(400).send({ message: 'User already exist' })
      }

      res.status(200).send({ message: 'Register Success' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  keepLogin: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id
        }
      })
      res.status(200).send({ message: 'Keep login', user })
    } catch (err) {
      res.status(400).send({ err: err.message })
    }
  },
  getUser: async (req, res) => {
    try {
      const dataCashier = await User.findAll({
        where: {
          isAdmin: false
        }
      })
      res.status(200).send({ dataCashier })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  updateImage: async (req, res) => {
    try {
      await User.update(
        {
          image: req.file?.path
        },
        {
          where: { id: req.user.id }
        }
      )
      res.status(200).send('success upload')
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message })
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id, isEnabled } = req.body
      const updateFields = {}

      if (id) {
        updateFields.id = id
        updateFields.isEnabled = isEnabled
        await User.update(updateFields, {
          where: {
            id: id
          }
        })
      }
      res.status(200).send({ message: 'Data updated' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  updateUserVerified: async (req, res) => {
    try {
      await User.update(
        {
          isVerified: true
        },
        {
          where: {
            id: req.user.id
          }
        }
      )
      res.status(200).send({ message: 'Data verified updated' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const { password } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      await User.update(
        {
          password: hashPassword
        },
        {
          where: {
            id: req.user.id
          }
        }
      )

      res.status(200).send({ message: 'Password successfully updated' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  deleteCashier: async (req, res) => {
    const id = req.params.id
    try {
      const result = await User.destroy({
        where: {
          id: id
        }
      })
      res.status(200).send({ message: 'Account successfully deleted' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  resetPassword: async (req, res) => {
    try {
      let { email } = req.query

      const findUser = await User.findOne({
        where: {
          email: email
        }
      })

      if (findUser) {
        let payload = { id: findUser.id }
        const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '24h' })
        const data = fs.readFileSync('./template_forgotPassword.html', 'utf-8')
        const tempCompile = await handlebars.compile(data)
        const tempResult = tempCompile({
          email: email,
          link: `http://localhost:3000/reset-password/${token}`
        })

        await transporter.sendMail({
          from: 'vadittolk@gmail.com',
          to: email,
          subject: 'CashHere - Reset Password',
          html: tempResult
        })

        return res.status(200).send({ message: 'Email has been sent' })
      }
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  }
}
