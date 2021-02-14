export default {
  title: 'Одностраничное приложение с примером аутентификации и авторизации',
  username: 'Имя пользователя',
  email: 'Email',
  enabled: 'Доступен',
  roles: 'Роли',
  addrecord: 'Добавить пользователя',
  updaterecord: 'Править пользователя',
  save: 'Сохранить',
  admin: 'Администратор',
  director: 'Директор',
  manager: 'Менеджер',
  menu: {
    users: {
      title: 'Пользователи',
      caption: 'Список пользователей и ролей'
    },
    manager: {
      title: 'Для меджера',
      caption: 'Контекст для роли меджера'
    },
    director: {
      title: 'Для директора',
      caption: 'Контекст для роли директора'
    },
    upload: {
      title: 'Загрузка файла',
      caption: 'Пример загрузки файла'
    },
    data: {
      title: 'Данные',
      caption: 'Таблица с данными по ролям'
    }

  },
  messages: {
    uploaded: 'Файл успешно загружен!',
    notuploaded: 'Файл не загружен!'
  },
  auth: {
    forgotpass: 'Забыли пароль?',
    signin: 'ВХОД',
    signup: 'РЕГИСТРАЦИЯ',
    auth: 'Авторизация',
    newuser: 'Новый пользователь',
    username: 'Пользователь',
    email: 'Email',
    password: 'Пароль',
    repassword: 'Повторить пароль'
  },
  validate: {
    required: 'Поле должно быть заполнено',
    short: 'Значение слишком короткое',
    isemail: 'Введите корректный email',
    match: 'Пароли не совпадают'
  }
}
