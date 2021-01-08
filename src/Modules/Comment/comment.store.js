/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import CommentService from './comment.service'
import RecentUpdateService from '@/Modules/RecentUpdates/recent.service'

const stateData = {
  comments: []
}
const mutations = {
  [types.SET_COMMENT] (state, comments) {
    state.comments = comments
  }
}
const actions = {
  async saveComment ({commit, rootGetters}, payload) {
    let user = rootGetters['user/user']
    if (user) {
      let comments = await CommentService.addOrderComment(user, payload)
      // RecentUpdateService.addRecentUpdate(user, payload, 'comment')
      commit(types.SET_COMMENT, comments)
    }
  }
}

const getters = {
  comments: (state) => state.comments
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
