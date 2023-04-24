// © 2021 Alexx Sub, https://github.com/alexxsub/
const rights = require('../data/rights')
const menu = require('../data/menu')

module.exports = {
  Query: {
    getMenu: async (_, args, { User, currentUser }) => {
      const roles = await User.findOne({ _id: currentUser._id })
        .then(res => res.roles)
      // обнуляем, если были права
      menu.map(el => el.enabled = false)

      if (roles) {
        roles.forEach(role => {
          menu.map(el => {
            el.enabled = (el.enabled ? true : el.enabled) || rights[role].includes(el.name) || rights[role].includes('*')
            return el
          })
        })
        var res = []
        // выгружаем элементы меню, которым права выданы
        res = menu.filter(el => el.enabled)
      } else res = []
      return res
    }
  },
  Mutation: {}
}
