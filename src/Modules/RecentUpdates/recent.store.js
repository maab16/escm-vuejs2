/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import RecentUpdateService from '@/Modules/RecentUpdates/recent.service'

const stateData = {
  recents: []
}

const mutations = {
  [types.SET_RECENT_UPDATES] (state, recents) {
    state.recents = recents
  }
}

const actions = {
  async setRecentUpdates ({commit, getters, rootGetters}, option = {}) {
    let user = rootGetters['user/user']
    if (user) {
      let userKey = getters.userKey
      let recents = []
      if (option.type === 'all') {
        recents = await RecentUpdateService.getRecentUpdates(user, userKey, option, null)
      } else if (option.type === 'summary') {
        recents = await RecentUpdateService.getRecentUpdates(user, userKey, option, process.env.RECENT_UPDATES_LIMIT)
      }
      commit(types.SET_RECENT_UPDATES, recents)
    }
  }
}

const gettersData = {
  recents: (state) => state.recents,
  userKey: (state, getters, rootState, rootGetters) => {
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let isInternalBuyer = rootGetters['user/isInternalBuyer']
    let isCustomer = rootGetters['user/isCustomer']
    if (isManager) {
      return 'manager_id'
    } else if (isBuyingLead) {
      return 'buying_lead_id'
    } else if (isInternalBuyer) {
      return 'internal_buyer_id'
    } else if (isCustomer) {
      return 'user_id'
    }
    return ''
  }
}

export default {
  state: stateData,
  mutations,
  actions,
  getters: gettersData
}
