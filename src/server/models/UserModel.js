
// © 2021 Alexx Sub, https://github.com/alexxsub/
const mongoose = require('mongoose'),
  bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  avatar: {
    type: String,
    index: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true
  },
  fullname: {
    type: String,
    index: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true
  },
  password: {
    type: String
  },
  roles: [String],
  enabled: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }

})
// crypt password before save in database
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
