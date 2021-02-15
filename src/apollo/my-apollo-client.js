import { split, ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
// import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error'
import bus from '../event-bus'

let httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URI || 'http://localhost:4001/api'
})

const middlewareLink = new ApolloLink((operation, forward) => {
  if (!localStorage.token) {
    localStorage.setItem('token', '')
  }
  operation.setContext({
    headers: {
      token: localStorage.getItem('token') || null
    }
  })
  return forward(operation)
})

httpLink = middlewareLink.concat(httpLink)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let logined = false
  if (graphQLErrors) {
    graphQLErrors.forEach(err => {
      bus.$emit('Error', err.message)
      if (err.extensions.code === 'UNAUTHENTICATED') {
        logined = true
        bus.$emit('Login')
      }
    }
    )
  }
  if ((networkError) && (!logined)) {
    bus.$emit('Error', networkError.message)
  }
}
)

httpLink = errorLink.concat(httpLink)
// support websocket
/* const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4002/api',
  options: {
    reconnect: true
  }
}) */

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
// split based on operation type
  ({
    query
  }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    )
  },
  // wsLink,
  httpLink
)

export { link }
