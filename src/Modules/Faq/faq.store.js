/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import FaqService from './faq.service'

const stateData = {
  faqs: []
}
const mutations = {
  [types.SET_FAQ] (state, faqs) {
    state.faqs = faqs
  }
}
const actions = {
  async setFaqs ({commit}) {
    commit(types.SET_FAQ, await FaqService.all())
  }
}
const getters = {
  faqs: (state) => state.faqs
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
