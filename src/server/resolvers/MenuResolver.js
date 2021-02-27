
module.exports = {
  Query: {
    getMenu: async (_, args, { User, currentUser }) => {
      const roles = await User.findOne({ _id: currentUser._id })
        .then(res => res.roles)
      const rights = {
        admin: ['*'],
        director: ['home', 'data', 'upload', 'upload2', 'director', 'manager', 'profile'],
        manager: ['home', 'data', 'upload', 'upload2', 'manager', 'profile']
      }
      const menu = [
        {
          name: 'home',
          icon: 'home',
          link: '/#'
        },
        {
          name: 'upload',
          icon: 'cloud_upload',
          link: '/upload'
        },
        {
          name: 'upload2',
          icon: 'file_upload',
          link: '/upload2'
        },
        {
          name: 'users',
          icon: 'people',
          link: '/users'
        },
        {
          name: 'director',
          icon: 'mdi-account-cowboy-hat',
          link: '/director'
        },
        {
          name: 'manager',
          icon: 'mdi-account-hard-hat',
          link: '/manager'
        },
        {
          name: 'data',
          icon: 'mdi-table-eye',
          link: '/table'
        }
      ]
      if (roles) {
        roles.forEach(role => {
          menu.map(el => {
            el.enabled = rights[role].includes(el.name) || rights[role].includes('*')
            return el
          })
        })
        var res = []
        menu.map(el => {
          if (el.enabled) res.push(el)
        })
      } else res = []
      return res
    }
  },
  Mutation: {}
}
