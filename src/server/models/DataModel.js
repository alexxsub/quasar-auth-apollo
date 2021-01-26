
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

  admin: {
    type: String

  },
  director: {
    type: String
  },
  manager: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Data', UserSchema)
