// © 2021 Alexx Sub, https://github.com/alexxsub/
const { UserInputError } = require('apollo-server-express')
const hiddenFields = ['_id', '__v',
  'password', 'createdDate'
]
module.exports = {
  Query: {
    getColumns: async (_, { model }, ctx) => {
      if (ctx[model] === undefined) {
        throw new UserInputError('Model name is invalid', {
          invalidArgs: model
        })
      }
      const myschema = ctx[model].schema
      var res = []
      myschema.eachPath((path) => {
        // do not show all fields
        if (!hiddenFields.includes(path)) {
          res.push({
            name: path,
            type: myschema.paths[path].instance
          })
        }
      })

      return res
    }
  },
  Mutation: {}
}
