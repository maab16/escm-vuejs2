/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import AnalyticService from '@/Modules/Analytic/analytic.service'

const stateData = {
  orders: [],
  popularProducts: [],
  getOrdersByMonth: [],
  getCompanyDistributionData: [],
  getUnavailableProductsByMonth: [],
  getUnavailableProducts: [],
  getBuyerCompanyData: [],
  successfulOrders: [],
  slsOrders: [],
  completedOrders: [],
  pendingOrders: [],
  customerOrders: [],
  internalBuyerOrders: []
}
const mutations = {
  [types.SET_ANALYTIC_ORDERS] (state, orders) {
    state.orders = orders
  },
  [types.SET_POPULAR_PRODUCTS] (state, products) {
    state.popularProducts = products
  },
  [types.SET_ORDERS_BY_MONTH] (state, data) {
    state.getOrdersByMonth = data
  },
  [types.SET_DISTRIBUTION_DATA] (state, data) {
    state.getCompanyDistributionData = data
  },
  [types.SET_UNAVIALBLE_ORDERS_BY_MONTH] (state, data) {
    state.getUnavailableProductsByMonth = data
  },
  [types.SET_UNAVAILABLE_PRODUCTS] (state, requests) {
    state.getUnavailableProducts = requests
  },
  [types.SET_CUSTOMER_ORDERS] (state, customerOrders) {
    state.customerOrders = customerOrders
  },
  [types.SET_SUCCESSFUL_ORDERS] (state, orders) {
    state.successfulOrders = orders
  },
  [types.SET_SLS_ORDERS] (state, orders) {
    state.slsOrders = orders
  },
  [types.SET_COMPLETED_ORDERS] (state, orders) {
    state.completedOrders = orders
  },
  [types.SET_PENDING_ORDERS] (state, orders) {
    state.pendingOrders = orders
  },
  [types.SET_INTERNAL_BUYER_ORDERS_BY_MONTH] (state, orders) {
    state.internalBuyerOrders = orders
  },
  [types.SET_BUYER_COMPANY_DATA] (state, data) {
    state.getBuyerCompanyData = data
  }
}
const actions = {
  async setAnalyticOrders ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let customerOrders = await AnalyticService.getAnalyticOrders(process.env.ANALYTIC_CUSTOMERS_LIMIT)
      // commit(types.SET_ANALYTIC_ORDERS, orders)
      commit(types.SET_CUSTOMER_ORDERS, customerOrders)
    }
  },
  async setPopularProducts ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']

    if (loggedUser) {
      let products = await AnalyticService.getPopularProducts(process.env.ANALYTIC_POPULAR_PRODUCTS_LIMIT)
      commit(types.SET_POPULAR_PRODUCTS, products)
    }
  },
  async setOrdersByMonth ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let orders = await AnalyticService.getOrdersByMonth(process.env.ANALYTIC_ORDER_BY_MONTHS)
      commit(types.SET_ORDERS_BY_MONTH, orders)
    }
  },
  async setCompanyDistributionData ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let companyDistributionData = await AnalyticService.getCompanyDistributionData(process.env.ANALYTIC_ORGANIZATION_DATA_LIMIT)
      commit(types.SET_DISTRIBUTION_DATA, companyDistributionData)
    }
  },
  async setUnavailableOrdersByMonth ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let unavailableOrders = await AnalyticService.getUnavailableOrdersByMonth(process.env.ANALYTIC_UNAVAILABLE_ORDERS_BY_MONTHS)
      commit(types.SET_UNAVIALBLE_ORDERS_BY_MONTH, unavailableOrders)
    }
  },
  async setInternalBuyerOrdersByMonth ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let buyerOrders = await AnalyticService.getInternalBuyerOrdersByMonth()
      commit(types.SET_INTERNAL_BUYER_ORDERS_BY_MONTH, buyerOrders)
    }
  },
  async setCompanyDataByBuyer ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let comapnyDataByBuyer = await AnalyticService.getCompanyDataByBuyer(process.env.ANALYTIC_ORGANIZATION_DATA_LIMIT)
      commit(types.SET_BUYER_COMPANY_DATA, comapnyDataByBuyer)
    }
  },
  async setUnavailableProducts ({commit, rootGetters}) {
    let user = rootGetters['user/user']
    if (user) {
      let unavailableProducts = await AnalyticService.getUnavailableProducts(process.env.ANALYTIC_UNAVAILABLE_PRODUCTS_LIMIT)
      commit(types.SET_UNAVAILABLE_PRODUCTS, unavailableProducts)
    }
  },
  async setOrdersByStatus ({commit, rootGetters}, {status, option}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let setter = 'SET_' + status.trim().toUpperCase() + '_ORDERS'
      let ordersByStatus = await AnalyticService.getOrdersByStatus(status, option)
      commit(types[setter], ordersByStatus)
    }
  },
  async setSuccessfulOrders ({dispatch}, option = {}) {
    dispatch('setOrdersByStatus', {
      status: 'successful',
      option: option
    })
  },
  async setSlsOrders ({dispatch}, option = {}) {
    dispatch('setOrdersByStatus', {
      status: 'sls',
      option: option
    })
  },
  async setCompletedOrders ({dispatch}, option = {}) {
    dispatch('setOrdersByStatus', {
      status: 'completed',
      option: option
    })
  },
  async setPendingOrders ({dispatch, commit, rootGetters}, option = {}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      dispatch('setOrdersByStatus', {
        status: 'pending',
        option: option
      })
    }
  }
}

const getters = {
  analyticOrders: (state) => state.orders,
  popularProducts: (state) => state.popularProducts,
  getOrdersByMonth: (state) => state.getOrdersByMonth,
  getCompanyDistributionData: (state) => state.getCompanyDistributionData,
  getUnavailableProductsByMonth: (state) => state.getUnavailableProductsByMonth,
  getInternalBuyerOrdersByMonth: (state) => state.internalBuyerOrders,
  getUnavailableProducts: (state) => state.getUnavailableProducts,
  getBuyerCompanyData: (state) => state.getBuyerCompanyData,
  customerOrders: (state) => state.customerOrders,
  successfulOrders: (state) => state.successfulOrders,
  slsOrders: (state) => state.slsOrders,
  completedOrders: (state) => state.completedOrders,
  pendingOrders: (state) => state.pendingOrders
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
