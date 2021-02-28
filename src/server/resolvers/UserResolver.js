const bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  { UserInputError } = require('apollo-server-express')

const createToken = (user, secret, expiresIn) => {
  const { _id, username } = user
  return jwt.sign({ _id, username }, secret, { expiresIn })
}

module.exports = {
  User: {

    createdDate: (rec) => {
      const d = new Date(String(rec.createdDate))
      return d.toLocaleString()
    }
  },

  Query: {

    getUsers: async (_, args, { User }) => {
      const users = await User.find({}).sort({ createdDate: 'desc' })

      return users
    },
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null
      }
      const user = await User.findOne({
        username: currentUser.username
      })
      return user
    }
  },
  Mutation: {
    // authentication and generates token
    signIn: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username })
      if (!user) throw new Error('Incorrect username or password')
      if (!user.enabled) throw new Error('Access denied! Your authorization disabled.')
      if (user.password !== undefined) {
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) throw new Error('Incorrect username or password')
      } else { throw new Error('The user doest\' set password') }

      // token's lifetime 1 day
      return { token: createToken(user, process.env.SECRET, '24hr') }
    },

    signUp: async (_, { email, username, password, avatar }, { User }) => {
      // check user in database
      const user = await User.findOne({ username })
      // fire error event if user exists
      if (user) {
        throw new UserInputError(`This user '${username}' already exists`, {
          invalidArgs: username
        })
      }
      const count = await User.find().count(),
        defaultRoles = count === 0 ? ['admin'] : ['manager'],
        defaultEnabled = (count === 0)
      // add new user
      const newUser = await new User({
        avatar,
        username,
        email,
        password,
        roles: defaultRoles,
        enabled: defaultEnabled
      }).save()

      return newUser
    },
    modifyUser: async (_, { input }, { User }) => {
      if (input.id === '') {
        const res = await new User({
          avatar: input.avatar,
          username: input.username,
          email: input.email,
          roles: input.roles,
          password: '',
          enabled: input.enabled
        }).save()

        return res
      } else {
        const res = await User.findOneAndUpdate({
          _id: input.id
        }, {
          $set: {
            avatar: input.avatar,
            username: input.username,
            email: input.email,
            roles: input.roles,
            enabled: input.enabled
          }
        }, {
          new: true
        }
        )
        return res
      }
    },
    enabledUser: async (_, { id, enabled }, { User }) => {
      const res = await User.findOneAndUpdate({
        _id: id
      }, {
        $set: {
          enabled
        }
      }, {
        new: true
      }
      )
      return res
    },
    deleteUser: async (_, { id }, { User }) => {
      const res = await User.findByIdAndRemove({
        _id: id
      }).then()
      return res
    }

  }
}
