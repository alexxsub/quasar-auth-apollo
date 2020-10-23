const path = require('path'),
  { loadFilesSync } = require('@graphql-tools/load-files'),
  { mergeTypeDefs } = require('@graphql-tools/merge')

const typesArray = loadFilesSync(path.join(__dirname, '*.gql'))

module.exports = mergeTypeDefs(typesArray, { all: true })
