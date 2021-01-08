/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import Cookies from 'js-cookie'
import UserService from '@/Modules/User/user.service'
import * as types from './mutation-types'

const stateData = {
  user: localStorage.getItem('user') != null
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  otp: Cookies.get('otp') !== undefined ? JSON.parse(Cookies.get('otp')) : null,
  token: Cookies.get('token') ? Cookies.get('token') : null,
  terms: []
}

const mutations = {
  [types.SET_USER] (state, payload) {
    state.user = payload
  },
  [types.SET_OTP] (state, payload) {
    state.otp = Number(payload)
    Cookies.remove('otp')
    Cookies.set('otp', payload, { expires: process.env.OTP_LIFETIME })
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
    Cookies.set('token', token, {expires: 365})
  },
  [types.LOGOUT] (state) {
    state.user = null
    state.otp = null
    state.token = null
    Cookies.remove('token')
  },
  [types.RESET_LOCAL_STORAGE] (satte) {
    // localStorage.clear()
    localStorage.setItem('product_keywords', JSON.stringify([]))
    localStorage.setItem('product_advanced_options', JSON.stringify([]))
  },
  [types.SET_TERMS] (state, terms) {
    state.terms = terms
  }
}

const actions = {
  async sendOTP ({commit}, email) {
    // let otp = Math.floor(1000 + Math.random() * 9000)
    const crypto = window.crypto || window.msCrypto
    var array = new Uint32Array(1)
    crypto.getRandomValues(array)
    const otp = array[0].toString().substr(0, 4)
    // await UserService.sendOTP(email, otp)
    commit(types.SET_OTP, otp)
  },
  async createNewUser ({commit}, payload) {
    UserService.createUser(payload)
  },
  async loginInternalUser ({commit}, email) {
    let response = await UserService.verifyInternalUser(email)
    if (response.success === true) {
      return true
    }
    return false
  },
  async verifyCustomerUser ({commit}, paylaod) {
    return await UserService.verifyCustomerUser(paylaod)
  },
  async verifyUser ({commit, dispatch}, payload) {
    let response = await UserService.login({
      email: payload.email,
      otp: payload.otp
    })
    console.log(response.token)
    // commit(types.SET_USER, response.user)
    dispatch('saveToken', response.token)
  },
  saveToken ({commit}, token) {
    commit(types.SET_TOKEN, token)
  },
  async fetchUser ({commit}) {
    let user = await UserService.getUserByToken()
    console.log(user)
    if (!user) {
      commit(types.SET_TOKEN, null)
    }
    commit(types.SET_USER, user)
  },
  async logout ({commit}) {
    commit(types.LOGOUT)
    commit(types.RESET_LOCAL_STORAGE)
  },
  setDefaultOTP ({commit}, payload) {
    commit(types.SET_OTP, null)
  },
  async resendOtp ({commit}, payload) {
    return await UserService.resendOTP(payload)
  },
  async getTermsOfUse ({commit}, type) {
    commit(types.SET_TERMS, await UserService.getTerms(type))
  },
  async download ({commit}, type) {
    let response = await UserService.download(type)
    return response
  }
}

const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  check: (state) => state.user !== null,
  terms: (state) => state.terms,
  can: (state) => (name) => {
    if (state.user) {
      let isPermission = false

      state.user.roles.forEach(role => {
        role.permissions.forEach(permission => {
          if (permission.name === name) {
            isPermission = true
          }
        })
      })

      return isPermission
    }
    return false
  },
  hasPermission: (state) => (name) => {
    if (state.user) {
      let isPermission = false

      state.user.roles.forEach(role => {
        role.permissions.forEach(permission => {
          if (permission.name === name) {
            isPermission = true
          }
        })
      })

      return isPermission
    }
    return false
  },
  hasRole: (state) => (slug) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.name === slug) {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isAdmin: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.name === 'Admin_Security_Default' || role.name === 'admin_Security_Default') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isSupplierManager: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.name === 'SupplierManager_Security_Default') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isManager: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.name === 'ProjectManager_Security_Default') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isBuyingLead: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.name === 'BuyingLead_Security_Default') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isInternalBuyer: (state) => {
    let isRole = false
    if (state.user) {
      state.user.roles.forEach(role => {
        if (role.name === 'InternalBuyer_Security_Default') {
          isRole = true
        }
      })
    }
    console.log(isRole)
    return isRole
  },
  isCustomer: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.name === 'CustomerOrg_Security_Default') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isCustomerUser: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.name === 'user_Security_Default') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  getOTP: (state) => {
    return state.otp
  },
  getNameFromEmail: (state) => (email) => {
    return email.substring(0, email.lastIndexOf('@'))
  },
  getDomainFromEmail: (state) => (email) => {
    return email.substring(email.lastIndexOf('@') + 1)
  }
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
