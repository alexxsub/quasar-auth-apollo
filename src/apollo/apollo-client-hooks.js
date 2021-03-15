// eslint-disable-next-line no-unused-vars
import { link } from './my-apollo-link'

export function apolloClientBeforeCreate ({ apolloClientConfigObj }) {
  // { apolloClientConfigObj, app, router, store, ssrContext, urlPath, redirect } */
  apolloClientConfigObj.link = link
}

export function apolloClientAfterCreate (/* { apolloClient, app, router, store, ssrContext, urlPath, redirect } */) {
  // if needed you can modify here the created apollo client

}
