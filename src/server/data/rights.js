const rights = {
  admin: ['*'],
  director: ['home', 'data', 'upload', 'upload2', 'director', 'manager', 'profile'],
  manager: ['home', 'data', 'upload', 'upload2', 'manager', 'profile']
}

module.exports = { rights }
