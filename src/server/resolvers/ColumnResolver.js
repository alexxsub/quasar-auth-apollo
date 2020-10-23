
const notshownFields = ['_id', '__v',
  'password'
]

module.exports = {
  Query: {

    getColumns: async (_, { table }, ctx) => {
      const res = []
      if (ctx[table] !== undefined) {
        const myschema = ctx[table].schema

        myschema.eachPath((path) => {
          if (!notshownFields.includes(path)) {
            res.push({ name: path })
          }
        })
      }
      return res
    }
  }
}
