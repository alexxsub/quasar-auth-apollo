
module.exports = {
  Query: {
    getMenu: async (_, args, { currentUser }) => {
      console.log(currentUser)
      const rights = [
        { admin: ['*'] },
        { director: ['home', 'upload', 'upload2', 'director', 'manager', 'profile'] },
        { manager: ['home', 'upload', 'upload2', 'manager', 'profile'] }
      ]
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
      var res = []

      return menu
    }
  },
  Mutation: {}
}
