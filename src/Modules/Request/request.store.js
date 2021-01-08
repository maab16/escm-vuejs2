/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import RequestService from './request.service'

const stateData = {
  orders: []
}
const mutations = {
  [types.SET_REQUEST] (state, orders) {
    state.orders = orders
  }
}
const actions = {
  async setRequests ({commit, getters, rootGetters}, option) {
    let user = rootGetters['user/user']
    if (user) {
      let requests = []
      option.userKey = getters.userKey
      requests = await RequestService.getRequests(option)
      console.log(requests)
      commit(types.SET_REQUEST, requests)
      return true
    }
    return false
  }
}

const gettersData = {
  orders: state => state.orders,
  userKey: (state, getters, rootState, rootGetters) => {
    if (rootGetters['user/isManager']) {
      return 'manager_id'
    } else if (rootGetters['user/isBuyingLead']) {
      return 'buying_lead_id'
    } else if (rootGetters['user/isInternalBuyer']) {
      return 'internal_buyer_id'
    } else if (rootGetters['user/isCustomer']) {
      return 'user_id'
    }
    return null
  }
}

export default {
  state: stateData,
  mutations,
  actions,
  getters: gettersData
}
