const rights = {
  admin: ['*'],
  director: ['home', 'data', 'director', 'manager', 'profile'],
  manager: ['home', 'data', 'manager', 'profile']
}

module.exports = { rights }
