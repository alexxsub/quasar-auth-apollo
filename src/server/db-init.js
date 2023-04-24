var mongoose = require('mongoose')
const { User } = require('./models')
require('dotenv').config({ path: '../../.env' })

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  retryWrites: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URI, options)

var db = mongoose.connection

db.on('error', err => console.log(err))

db.once('open',
  function () {
    console.log(`🎉  Mongo connected ${process.env.MONGO_URI}`)
    const data = [{
      roles: [
        'admin'
      ],
      enabled: true,
      avatar: '1879ebc9a27.png',
      username: 'admin',
      fullname: 'Darth Vader',
      email: 'admin@mail.ru',
      password: '$2b$10$sz4ZwM9zwfRNKTldJNb1uOlQojF1C5R28RF15z0YSdSfs5Fl8KtDu'
    }, {

      roles: [
        'director',
        'manager'
      ],
      enabled: true,
      avatar: '1879ec1ab8a.jpg',
      username: 'director',
      fullname: 'Steve Jobs',
      email: 'director.mail.ru',
      password: '$2b$10$DfSgBeitND6XVJ3yxe1pweHWxENW/VSq5bM9jom7j27dm0dBceE8O'
    }, {
      roles: [
        'manager'
      ],
      enabled: true,
      avatar: '1879ec26710.jpg',
      username: 'manager',
      fullname: 'John Doe',
      email: 'manager@mail.ru',
      password: '$2b$10$fYA07e1LPyV83BRVLu9y6O5h5VX4OInrNRZ.g2zLodiHuUj6SOpsq'
    }]
    User.collection.insertMany(data, function (err, r) {
      if (err) {
        console.error(err)
      } else {
        console.log('Demo has been created')
        process.exit(1)
      }
    })
  })
