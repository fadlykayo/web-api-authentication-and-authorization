var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Go to http://localhost:8080/')
})

router.get('/auth', function (req, res, next) {
  res.send({
    endpoints: [
      '/auth/register',
      '/auth/login',
      '/auth/users',
      '/auth/users/:id'
    ]
  })
})

router.post('/auth/users/register', userController.createUser)

router.post('/auth/users/login', userController.verifyUser)

router.get('/auth/users', userController.getUsers)

router.put('/auth/users/:id', userController.updateUser)

router.delete('/auth/users/:id', userController.deleteUser)

module.exports = router
