
// © 2021 Alexx Sub, https://github.com/alexxsub/
const { AuthenticationError } = require('apollo-server-express')
const { rights } = require('../data/rights')
module.exports = {
  Query: {
    checkAccess: async (_, { res }, { User, currentUser }) => {
      const roles = await User.findOne({ _id: currentUser._id })
        .then(res => res.roles)

      let result = false
      if (roles) {
        roles.forEach(role => {
          if (rights[role].includes(res) || rights[role].includes('*')) result = true
          else throw new AuthenticationError()
        })
      }
      return result
    }
  },
  Mutation: {}
}
