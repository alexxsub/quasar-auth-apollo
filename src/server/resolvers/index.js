// © 2021 Alexx Sub, https://github.com/alexxsub/
const path = require('path'),
  { loadFilesSync } = require('@graphql-tools/load-files'),
  { mergeResolvers } = require('@graphql-tools/merge'),
  resolversArray = loadFilesSync(
    path.join(__dirname, '*Resolver.js'))

module.exports = mergeResolvers(resolversArray)
