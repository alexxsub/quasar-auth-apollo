import gql from 'graphql-tag'

export const fragment = gql`
  fragment User on User {
    id
    username
    email
    roles
    createdDate
  }
`
export const CURRENT_USERS = gql`
  query getCurrentUser {
    getCurrentUser {
      ...User
    }
  }
  ${fragment}
`
export const USERS = gql`
  query getUsers {
    getUsers {
      ...User
    }
  }
  ${fragment}
`
export const MODIFY_USER = gql`
  mutation modifyUser($input: inputUser!) {
    modifyUser(input: $input) {
      ...User
    }
  }
  ${fragment}
`
export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
    ...User
    }
  }
  ${fragment}
`
export const SIGNIN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      Token
    }
  }
`
export const SIGNUP = gql`
  mutation signIn($username: String!,$email: String!, $ypassword: String!) {
    signIn(username: $username, email: $email, password: $password) {
      ...User
    }
  }
  ${fragment}
`
