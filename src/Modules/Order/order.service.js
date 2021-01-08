import http from '@/app/services/httpClient.js'

const ENDPOINT = 'orders'

class OrderService {
  async createOrder (user, data) {
    // console.log(data)
    let response = await http.post(ENDPOINT, data)
    return response.data
  }
  async getOrders (option = {}, limit = null) {
    option.limit = limit
    console.log(option)
    let response = await http.get(ENDPOINT, {
      params: option
    }).then(res => res.data)
    return response
  }
  async getOrder (id) {
    let response = await http.get(ENDPOINT + '/' + id)
    return response.data
  }
  async getProjectManagers (keywords = '') {
    let response = await http.get('project-managers', {params: keywords})
    return response.data
  }
  async getBuyingLeads (keywords = '') {
    let response = await http.get('buying-leads', {params: keywords})
    return response.data
  }
  async getInternalBuyers (id) {
    let response = await http.get('/buying-lead/buyers/' + id)
    return response.data
  }
  async updateOrder (order, rootGetters) {
    let data = {
      id: order.id,
      user_id: order.user_id,
      manager_id: order.manager_id,
      buying_lead_id: order.buying_lead_id,
      internal_buyer_id: order.internal_buyer_id,
      address_id: order.address_id,
      currency: order.currency,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
      products: order.products,
      requests: order.requests,
      user: rootGetters['user/user']
    }

    let response = await http.put(ENDPOINT + '/' + order.id, data)
    return response.data
  }
  async updateProductLines (user, order, products) {
    let data = {
      id: order.id,
      user_id: order.user_id,
      manager_id: order.manager_id,
      buying_lead_id: order.buying_lead_id,
      internal_buyer_id: order.internal_buyer_id,
      address_id: order.address_id,
      currency: order.currency,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
      products: order.products,
      requests: order.requests,
      user: user
    }
    let response = await http.put(ENDPOINT + '/lines/' + data.id, {data})
    return response.data
  }
}

export default new OrderService()
