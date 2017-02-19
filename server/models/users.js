const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let RegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return RegEx.test(email)
      }
    }
  },
  password: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Users', UserSchema)
