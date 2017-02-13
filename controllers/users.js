const Users = require('../models/users')
let jwt = require('jsonwebtoken')
let hash = require('password-hash')
let config = require('../configs/config.json')

module.exports = {
  createUser: (req, res) => {
    Users.create({
      username: req.body.username,
      password: hash.generate(req.body.password),
      email: req.body.email
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  getUsers: (req, res) => {
    Users.find().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  updateUser: (req, res) => {
    Users.findOneAndUpdate({
      _id: req.params.id
    }, {username: req.body.username, password: hash.generate(req.body.password)}, {
      new: true
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  deleteUser: (req, res) => {
    Users.findOneAndRemove({
      _id: req.params.id
    }).then(function (data) {
      res.send({m: `Deleted User with ID: ${req.params.id}`})
    }).catch(function (err) {
      res.send({m: 'Error data not found'})
    })
  },

  verifyUser: (req, res) => {
    Users.findOne({
      username: req.body.username
    }).then(function (data) {
      if (hash.verify(req.body.password, data.password)) {
        let token = jwt.sign({data}, config.secret, {algorithm: 'HS256'}, {expiresIn: '1h'})
        res.send({
          s: true,
          token: token
        })
      } else {
        res.json({s: false, m: 'Authentication failed. Wrong password.'})
      }
    }).catch(function () {
      res.send({s: false, m: 'Authentication failed. User not found.'})
    })
  }
}
