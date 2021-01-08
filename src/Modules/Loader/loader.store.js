/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'

const stateData = {
  loading: false
}
const mutations = {
  [types.SET_LOADER] (state, payload) {
    state.loading = payload
  }
}
const actions = {
  set ({commit}, payload) {
    commit(types.SET_LOADER, payload)
  }
}
const getters = {
  loading: state => state.loading
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
