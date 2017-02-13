var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({
    message: 'You are in home'
  })
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

router.get('/auth/users', userController.getUsers)

router.post('/auth/register', userController.createUser)

router.put('/auth/users/:id', userController.updateUser)

router.delete('/auth/users/:id', userController.deleteUser)

router.post('/auth/login', userController.verifyUser)

module.exports = router
