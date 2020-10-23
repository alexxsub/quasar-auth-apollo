
module.exports = {
  Data: {
    admin: (rec, _, { currentUser }) => {
      if (currentUser.username === 'Bond') {
        return rec.admin
      } else {
        return '*'
      }
    },
    createdDate: (rec) => {
      const d = new Date(String(rec.createdDate))
      return d.toLocaleString()
    }
  },

  Query: {

    getData: async (_, args, { Data }) => {
      const users = await Data.find({}).sort({ createdDate: 'desc' })

      return users
    }
  },
  Mutation: {

  }
}
