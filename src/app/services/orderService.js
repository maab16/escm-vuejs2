import http from '../services/httpCommon.js'

class OrderDataService {
  getOrdersAll () {
    return http.get('/sls')
  }
  getOrder (id) {
    return http.get(`/orders/${id}`)
  }
}

export default new OrderDataService()
