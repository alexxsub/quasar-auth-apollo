const hiddenFields = ['_id', '__v',
  'password', 'createdDate'
]
module.exports = {
  Query: {
    getColumns: async (_, { model }, ctx) => {
      const myschema = ctx[model].schema
      var res = []
      myschema.eachPath((path) => {
        // do not show all fields
        if (!hiddenFields.includes(path)) {
          const f = {
            name: path,
            type: myschema.paths[path].instance
          }
          res.push(f)
        }
      })

      return res
    }
  },
  Mutation: {}
}
