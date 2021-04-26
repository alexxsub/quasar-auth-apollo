// © 2021 Alexx Sub, https://github.com/alexxsub/
const { rights } = require('../data/rights')
const { menu } = require('../data/menu')
module.exports = {
  Query: {
    getMenu: async (_, args, { User, currentUser }) => {
      const roles = await User.findOne({ _id: currentUser._id })
        .then(res => res.roles)
      if (roles) {
        roles.forEach(role => {
          menu.map(el => {
            el.enabled = el.enabled || rights[role].includes(el.name) || rights[role].includes('*')
            return el
          })
        })
        var res = []
        res = menu.map(el => {
          if (el.enabled) return el
        })
      } else res = []
      return res
    }
  },
  Mutation: {}
}
