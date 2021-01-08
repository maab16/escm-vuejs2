/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Cookies from 'js-cookie'
import * as types from './mutation-types'
import AddressService from '@/Modules/Address/address.service'
import ProductService from '@/Modules/Product/product.service'
import moment from 'moment'

const stateData = {
  carts: localStorage.getItem('carts') != null
    ? JSON.parse(localStorage.getItem('carts'))
    : [],
  requests: localStorage.getItem('request_carts') != null
    ? JSON.parse(localStorage.getItem('request_carts'))
    : [],
  checkList: localStorage.getItem('check_list') != null
    ? JSON.parse(localStorage.getItem('check_list'))
    : [],
  requestList: localStorage.getItem('request_list') != null
    ? JSON.parse(localStorage.getItem('request_list'))
    : [],
  total: localStorage.getItem('total_carts') != null
    ? JSON.parse(localStorage.getItem('total_carts'))
    : 0,
  deliveryAddress: null,
  addresses: [],
  lastCartUpdated: Cookies.get('last_cart_updated') ? Cookies.get('last_cart_updated') : moment().format('YYYY-MM-DD HH:mm:ss')
}
const mutations = {
  [types.SET_CART] (state, carts) {
    state.carts = carts
    localStorage.setItem('carts', JSON.stringify(carts))
  },
  [types.SET_CART_REQUEST] (state, requests) {
    state.requests = requests
    localStorage.setItem('request_carts', JSON.stringify(requests))
  },
  [types.SET_TOTAL_CART] (state, total) {
    state.total = total
    localStorage.setItem('total_carts', total)
  },
  [types.REMOVE_ALL_CART] (state, payload) {
    state.carts = []
    state.requests = []
    state.total = 0
    localStorage.setItem('carts', JSON.stringify([]))
    localStorage.setItem('request_carts', JSON.stringify([]))
    localStorage.setItem('check_list', JSON.stringify([]))
    localStorage.setItem('request_list', JSON.stringify([]))
    localStorage.setItem('total_carts', 0)
  },
  [types.SET_CHECK_LIST] (state, products) {
    state.checkList = products
    localStorage.setItem('check_list', JSON.stringify(products))
  },
  [types.SET_REQUEST_LIST] (state, products) {
    state.requestList = products
    localStorage.setItem('request_list', JSON.stringify(products))
  },
  [types.SET_DELIVERY_ADDRESS] (state, address) {
    state.deliveryAddress = address
  },
  [types.SET_DELIVERY_ADDRESSES] (state, addresses) {
    state.addresses = addresses
  },
  [types.SET_LAST_UPDATE] (state, time) {
    state.lastCartUpdated = time
    Cookies.set('last_cart_updated', time)
  }
}
const actions = {
  addCart ({commit, state}, item) {
    let carts = state.carts
    let total = parseInt(state.total)
    let isDirty = false
    carts = carts.map(cart => {
      if (cart.id === item.id) {
        cart.qty = parseInt(cart.qty) + 1
        isDirty = true
      }
      return cart
    })
    if (!isDirty) {
      total++
      carts.push(item)
      commit(types.SET_TOTAL_CART, total)
    }
    commit(types.SET_CART, carts)
  },
  addRequest ({commit, state}, item) {
    let requests = localStorage.getItem('request_carts') != null
      ? JSON.parse(localStorage.getItem('request_carts'))
      : []
    let total = parseInt(state.total)
    let isDirty = false
    requests = requests.map(request => {
      if (request.cas === item.cas) {
        request.qty = parseInt(request.qty) + 1
        isDirty = true
      }
      return request
    })
    if (!isDirty) {
      total++
      requests.push(item)
      commit(types.SET_TOTAL_CART, total)
    }
    commit(types.SET_CART_REQUEST, requests)
  },
  async setCartItems ({commit, dispatch}) {
    let carts = localStorage.getItem('carts') != null
      ? JSON.parse(localStorage.getItem('carts'))
      : []
    let total = localStorage.getItem('total_carts') != null
      ? JSON.parse(localStorage.getItem('total_carts'))
      : 0
    let requests = localStorage.getItem('request_carts') != null
      ? JSON.parse(localStorage.getItem('request_carts'))
      : []

    carts.map(async (cart) => {
      let product = await ProductService.getProduct(cart.id)
      if (product && product.availability < 1) {
        cart.availability = 0
      } else if (product && cart.qty > product.availability) {
        cart.availability = product.availability
        cart.qty = product.availability
      }
      return cart
    })
    // carts = await ProductService.checkAvailabilty(ids)

    commit(types.SET_CART, carts)
    commit(types.SET_TOTAL_CART, total)
    commit(types.SET_CART_REQUEST, requests)
    commit(types.SET_LAST_UPDATE, moment().format('YYYY-MM-DD HH:mm:ss'))
  },
  async checkProductAvailability ({commit}, id) {
    let isAvailable = await ProductService.isAvailable(id)
    console.log(isAvailable)
    return isAvailable
  },
  changeCartToRequest ({commit}, item) {
    let carts = localStorage.getItem('carts') != null
      ? JSON.parse(localStorage.getItem('carts'))
      : []
    let requests = localStorage.getItem('request_carts') != null
      ? JSON.parse(localStorage.getItem('request_carts'))
      : []

    carts = carts.filter(cart => cart.id !== item.id)
    requests.push(item)

    commit(types.SET_CART, carts)
    commit(types.SET_CART_REQUEST, requests)
  },
  setCheckList ({commit}, payload) {
    commit(types.SET_CHECK_LIST, payload)
  },
  setOnlyRequestList ({commit}, payload) {
    commit(types.SET_REQUEST_LIST, payload)
  },
  removeCart ({commit, state}, item) {
    let carts = localStorage.getItem('carts') != null
      ? JSON.parse(localStorage.getItem('carts'))
      : []
    let total = localStorage.getItem('total_carts') != null
      ? JSON.parse(localStorage.getItem('total_carts'))
      : 0

    carts = carts.filter(cart => {
      if (cart.id === item.id) {
        if (total > 0) {
          total--
          commit(types.SET_TOTAL_CART, total)
        }
        return
      }
      return cart
    })

    commit(types.SET_CART, carts)
  },
  removeRequestCart ({commit, state}, item) {
    let requests = localStorage.getItem('request_carts') != null
      ? JSON.parse(localStorage.getItem('request_carts'))
      : []
    let total = localStorage.getItem('total_carts') != null
      ? JSON.parse(localStorage.getItem('total_carts'))
      : 0

    requests = requests.filter(cart => {
      if (cart.cas === item.cas) {
        if (total > 0) {
          total--
          commit(types.SET_TOTAL_CART, total)
        }
        return
      }

      return cart
    })

    commit(types.SET_CART_REQUEST, requests)
  },
  removeAllCart ({commit}, payload) {
    commit(types.REMOVE_ALL_CART, payload)
  },
  async setDeliveryAddresses ({commit, rootGetters}) {
    let addresses = await AddressService.getAddresses()
    commit(types.SET_DELIVERY_ADDRESSES, addresses)
  },
  setDeliveryAddress ({commit}, address) {
    commit(types.SET_DELIVERY_ADDRESS, address)
  },
  updateCart ({commit, getters}, item) {
    let carts = getters.carts
    carts = carts.map(cart => {
      if (cart.id === item.id) {
        return item
      }
      return cart
    })
    commit(types.SET_CART, carts)
  }
}

const gettersData = {
  carts: state => state.carts,
  requests: state => state.requests != null ? state.requests : [],
  checkList: state => state.checkList,
  requestList: state => state.requestList,
  total: state => state.total,
  addresses: state => state.addresses,
  deliveryAddress: state => state.deliveryAddress,
  updatedAt: state => state.lastCartUpdated
  // isCartItem: (state) => (payload) => {
  //   let carts = state.carts
  //   carts = carts.filter(cart => {
  //     if (cart.id === payload) {
  //       return cart
  //     }
  //   })
  //   return carts.length > 0
  // },
  // isRequestItem: (state) => (payload) => {
  //   let requests = state.requests
  //   requests = requests.filter(request => {
  //     if (request.id === payload) {
  //       return request
  //     }
  //   })
  //   return requests.length > 0
  // }
}

export default {
  state: stateData,
  mutations,
  actions,
  getters: gettersData
}
