import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import userStoreConfig from '../../src/store/modules/user'
import cloneDeep from 'lodash.clonedeep'

it('Store initiating correctly.', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(userStoreConfig))
  expect(store.state.user).toEqual({})
})

it('updating user via mutation is working.', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(userStoreConfig))
  const user = {
    email: 'haruki@murakami.com'
  }

  store.commit('updateUser', user)

  expect(store.state.user).toEqual(user)
})

it('tryLogin action is working.', async () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(userStoreConfig))
  const correct_logs = {
    email: 'haruki@murakami.com',
    password: 'anypassword'
  }

  await store.dispatch('tryLogin', correct_logs)

  expect(store.state.user).toEqual({
    '_id': 267,
    'email': 'haruki@murakami.com',
    'first_name': 'Haruki',
    'last_name': 'Murakami'
  })
})
