/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import Order from '@/Modules/Order/order.model'
import OrderDetails from '@/Modules/OrderDetails/order-details.model'
import OrderService from '@/Modules/Order/order.service'

const stateData = {
  orders: [],
  order: {},
  recentOrders: [],
  successfulOrders: 0,
  completedOrders: 0,
  slsOrders: 0,
  internalBuyers: [],
  projectManagers: [],
  buyingLeads: []
}
const mutations = {
  [types.SET_ORDERS] (state, orders) {
    state.orders = orders
  },
  [types.FETCH_ORDER] (state, order) {
    state.order = order
  },
  [types.SET_RECENT_ORDERS] (state, orders) {
    state.recentOrders = orders
  },
  [types.SET_SUCCESSFULL_ORDERS] (state, orders) {
    state.successfulOrders = orders
  },
  [types.SET_COMPLETED_ORDERS] (state, orders) {
    state.completedOrders = orders
  },
  [types.SET_SLS_ORDERS] (state, orders) {
    state.slsOrders = orders
  },
  [types.SET_PROJECT_MANAGERS] (state, managers) {
    state.projectManagers = managers
  },
  [types.SET_BUYING_LEADS] (state, leads) {
    state.buyingLeads = leads
  },
  [types.SET_INTERNAL_BUYERS] (state, buyers) {
    state.internalBuyers = buyers
  }
}
const actions = {
  async setOrders ({dispatch, commit, getters, rootGetters}, option) {
    let user = rootGetters['user/user']
    if (user) {
      let orders = []
      option.userKey = getters.userKey
      orders = await OrderService.getOrders(option)
      dispatch('setStatusOrders', orders)
      commit(types.SET_ORDERS, orders)
    }
  },
  async makeOrder ({commit, rootGetters}, payload) {
    let user = rootGetters['user/user']
    if (user != null) {
      payload.address_id = rootGetters['cart/deliveryAddress']
      payload.currency = rootGetters['product/currency']

      let order = await OrderService.createOrder(user, payload)

      commit(types.FETCH_ORDER, order)

      return {success: true, id: order.id}
    }
    return {success: false, id: undefined}
  },
  async fetchOrderDetails ({commit}, id) {
    let order = await OrderService.getOrder(id)
    commit(types.FETCH_ORDER, order)
  },
  setStatusOrders ({commit}, orders) {
    commit(types.SET_SUCCESSFULL_ORDERS, orders.filter(successfulOrder => successfulOrder.status === 'successful').length)
    commit(types.SET_COMPLETED_ORDERS, orders.filter(successfulOrder => successfulOrder.status === 'completed').length)
    commit(types.SET_SLS_ORDERS, orders.filter(successfulOrder => successfulOrder.status === 'sls').length)
  },
  async setRecentOrders ({dispatch, commit, getters, rootGetters}) {
    let user = rootGetters['user/user']
    if (user) {
      let userKey = getters.userKey
      let orders = await OrderService.getOrders({userKey}, process.env.RECENT_ORDERS_LIMIT)
      dispatch('setStatusOrders', orders)
      commit(types.SET_RECENT_ORDERS, orders)
      return true
    }

    return false
  },
  async setProjectManagers ({commit}, id) {
    let managers = await OrderService.getProjectManagers(id)
    commit(types.SET_PROJECT_MANAGERS, managers)
  },
  async setBuyingLeads ({commit}, id) {
    let leads = await OrderService.getBuyingLeads(id)
    commit(types.SET_BUYING_LEADS, leads)
  },
  async setInternalBuyers ({commit}, id) {
    let buyers = await OrderService.getInternalBuyers(id)
    commit(types.SET_INTERNAL_BUYERS, buyers)
  },
  async setProductLines ({commit, state, rootGetters}, orderData) {
    let user = rootGetters['user/user']
    if (orderData && user) {
      let order = await OrderService.updateOrder(orderData, rootGetters)
      commit(types.FETCH_ORDER, order)
    }
  },
  async updateOrder ({commit, rootGetters}, orderData) {
    let order = await OrderService.updateOrder(orderData, rootGetters)
    commit(types.FETCH_ORDER, order)
  }
}

const gettersData = {
  orders: (state) => state.orders,
  order: (state) => state.order,
  managers: (state) => state.projectManagers,
  leads: (state) => state.buyingLeads,
  buyers: (state) => state.internalBuyers,
  recentOrders: (state) => state.recentOrders,
  successfulOrders: (state) => state.successfulOrders,
  completedOrders: (state) => state.completedOrders,
  slsOrders: (state) => state.slsOrders,
  getMaxOrderId: (state) => {
    return Order.query().max('id')
  },
  getMaxOrderDetailsId: (state) => {
    return OrderDetails.query().max('id')
  },
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
