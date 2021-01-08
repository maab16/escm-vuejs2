/* eslint no-shadow: ["error", { "allow": ["state"] }] */
// import * as types from './mutation-types'
import OrganizationService from '@/Modules/Organization/organization.service'

const stateData = {}

const mutations = {}

const actions = {
  async verifyOrganization ({commit}, email) {
    return await OrganizationService.verifyOrganization(email)
  }
}

const getters = {}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
