
module.exports = {
  Query: {
    getData: async (_, args, { User, currentUser }) => {
      // fill demo data
      var data = []
      for (var i = 0; i < 9; i++) {
        var a = Math.floor(Math.random() * 100),
          b = Math.floor(Math.random() * 100),
          c = Math.floor(Math.random() * 100)
        data.push({ name: `line ${i}`, admin: a, director: b, manager: c })
      }
      // find roles of current user
      const roles = await User.findOne({ _id: currentUser._id })
        .then(res => res.roles)
      return data.map(el => {
        if (!roles.includes('admin')) el.admin = '*'
        if (!roles.includes('manager')) el.manager = '*'
        if (!roles.includes('director')) el.director = '*'
        return el
      })
    }
  },
  Mutation: {

  }
}
