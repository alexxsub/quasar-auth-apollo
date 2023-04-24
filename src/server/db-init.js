var mongoose = require('mongoose')
const { User } = require('./models')
require('dotenv').config({ path: '../../.env' })

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

async function main () {
  try {
    // подключаемся к базе данных
    await mongoose.connect(process.env.MONGO_URI, options)
    console.log('database connected...')

    // данные для импорта
    const userArray = [{
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
    // Добавляем значение свежее для поля дата создания
    userArray.map(item => {
      item.createdDate = new User().createdDate
    })

    await User.deleteMany() // удаляем предыдущие данные, на продуктиве это не запускать
    const data = await User.insertMany(userArray)

    console.log('Created users', data)
    console.log('Completed ...')
    process.exit(0)
  } catch (error) {
    console.log('erro:', error)
  }
}

main()
