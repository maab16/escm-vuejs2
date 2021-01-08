/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import ContactService from './contact.service'

const stateData = {
  contacts: [],
  contact: null,
  confirmationMessage: null
}
const mutations = {
  [types.SET_CONTACTS] (state, contacts) {
    state.contacts = contacts
  },
  [types.SET_CONTACT] (state, contact) {
    state.contact = contact
  },
  [types.SET_CONFIRMATION_MESSAGE] (state, message) {
    state.confirmationMessage = message
  }
}
const actions = {
  async getInTouch ({commit}, payload) {
    let response = await ContactService.send(payload)
    console.log(response)
    commit(types.SET_CONTACT, response.contact)
  },
  async getContacts ({commit}) {
    commit(types.SET_CONTACTS, await ContactService.all())
  },
  async getContact ({commit}, id) {
    commit(types.SET_CONTACT, await ContactService.get(id))
  },
  setConfirmationMessage ({commit}, message) {
    commit(types.SET_CONFIRMATION_MESSAGE, message)
  }
}
const getters = {
  contacts: (state) => state.contacts,
  contact: (state) => state.contact,
  confirmationMessage: (state) => state.confirmationMessage
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
