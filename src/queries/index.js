// © 2021 Alexx Sub, https://github.com/alexxsub/
import gql from 'graphql-tag'

export const fragment = gql`
  fragment User on User {
    _id
    avatar
    username
    fullname
    email
    roles
    enabled
    createdDate
  }
`
export const CURRENT_USER = gql`
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
export const MODIFY_PROFILE = gql`
  mutation modifyProfile($input: inputProfile!) {
    modifyProfile(input: $input) {
      ...User
    }
  }
  ${fragment}
`
export const ENABLED_USER = gql`
  mutation enabledUser($id: ID!,$enabled: Boolean!) {
    enabledUser(_id: $id, enabled: $enabled) {
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
      token
    }
  }
`
export const SIGNUP = gql`
  mutation signUp($username: String!,$email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      ...User
    }
  }
  ${fragment}
`
export const GET_COLUMNS = gql`
  query getColumns($model: String!) {
    getColumns(model: $model) {
      name
    }
  }
`
export const MENU = gql`
  query getMenu{
    getMenu {
      name
      icon
      link
    }
  }
`
export const DATA = gql`
  query getData{
    getData {
      name
      admin
      director
      manager
    }
  }
`
export const CHECK_ACCESS = gql`
  query checkAccess($res: String!){
    checkAccess(res: $res)
  }
`
