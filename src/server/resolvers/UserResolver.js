// © 2021 Alexx Sub, https://github.com/alexxsub/
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
        fullname: '',
        email,
        password,
        roles: defaultRoles,
        enabled: defaultEnabled
      }).save()

      return newUser
    },
    modifyProfile: async (_, { input }, { User }) => {
      const set = {
        avatar: input.avatar,
        username: input.username,
        fullname: input.fullname,
        email: input.email
      }
      const user = await User.findOne({ _id: input._id })
      if (!user) throw new Error('Cant\' find user!')
      else {
        if (!user.enabled) throw new Error('Access denied! Your authorization disabled.')
        if (input.changepassword) {
          const isValidPassword = await bcrypt.compare(input.oldpassword, user.password)
          if (!isValidPassword) throw new Error('Incorrect old password')
          set.password = input.newpassword
        }
      }
      const res = await User.findOneAndUpdate({ _id: input._id }, { $set: set }, { new: true })
      return res
    },
    modifyUser: async (_, { input }, { User }) => {
      if (input._id === '') {
        const res = await new User({
          avatar: input.avatar,
          username: input.username,
          name: input.name,
          email: input.email,
          roles: input.roles,
          password: '',
          enabled: input.enabled
        }).save()

        return res
      } else {
        const res = await User.findOneAndUpdate({
          _id: input._id
        }, {
          $set: {
            avatar: input.avatar,
            username: input.username,
            name: input.name,
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
    enabledUser: async (_, { _id, enabled }, { User }) => {
      const res = await User.findOneAndUpdate({
        _id
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
    deleteUser: async (_, { _id }, { User }) => {
      const res = await User.findByIdAndRemove({
        _id
      }).then()
      return res
    }

  }
}
