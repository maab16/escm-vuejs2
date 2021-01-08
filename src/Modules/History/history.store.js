/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import HistoryService from './history.service'
import * as types from './mutation-types'

const stateData = {
  histories: []
}

const mutations = {
  [types.UPDATE_HISTORY] (state, histories) {
    state.histories = histories
  }
}

const actions = {
  async addOrderHistory ({commit, rootGetters}, payload) {
    let user = rootGetters['user/user']
    if (user) {
      commit(types.UPDATE_HISTORY, HistoryService.createOrderHistory(user, payload))
    }
  }
}

const getters = {
  histories: (state) => state.histories
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
