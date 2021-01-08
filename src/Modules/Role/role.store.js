/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import RoleService from './role.service'

const stateData = {
  roles: []
}
const mutations = {
  [types.FETCH_ROLES] (state, roles) {
    state.roles = roles
  }
}

const actions = {
  async fetchRoles ({commit}) {
    let roles = RoleService.getRoles()
    commit(types.FETCH_ROLES, roles)
  }
}

const getters = {
  roles: state => state.roles
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
