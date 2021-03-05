import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import bus from '../event-bus'

let link = new HttpLink({
  uri: process.env.GRAPHQL_URI || 'http://localhost:4001/api'
})

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      token: localStorage.getItem('token') || null
    }
  })
  return forward(operation)
})

link = middlewareLink.concat(link)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let logined = false
  if (graphQLErrors) {
    graphQLErrors.forEach(err => {
      if (err.extensions.code === 'UNAUTHENTICATED') {
        logined = true
        bus.$emit('Login')
        bus.$emit('Error', '_havetoauth')
      } else { bus.$emit('Error', err.message) }
    }
    )
  }
  if ((networkError) && (!logined)) {
    if (networkError.message === 'Failed to fetch') { bus.$emit('Login') }
    bus.$emit('Error', networkError.message)
  }
}
)
link = errorLink.concat(link)

export { link }
