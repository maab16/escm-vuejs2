import http from '@/app/services/httpClient.js'

const ENDPOINT = 'analytic'

class AnalyticService {
  async getAnalyticOrders (limit = null) {
    let response = await http.get(ENDPOINT + '/orders', { params: {limit} })
    return response.data
  }
  async getPopularProducts (limit = null) {
    let response = await http.get(ENDPOINT + '/popular/products', { params: {limit} })
    return response.data
  }
  async getOrdersByMonth (months = 6) {
    let response = await http.get(ENDPOINT + '/orders-by-month', { params: {months} })
    return response.data
  }
  async getCompanyDistributionData (limit = null) {
    let response = await http.get(ENDPOINT + '/company-distribution-data', { params: {limit} })
    return response.data
  }
  async getUnavailableOrdersByMonth (months = 6) {
    let response = await http.get(ENDPOINT + '/unavailable-orders', { params: {months} })
    return response.data
  }
  async getInternalBuyerOrdersByMonth (limit = null) {
    let response = await http.get(ENDPOINT + '/buyer-orders', { params: {limit} })
    return response.data
  }
  getCompanyDataByBuyer (limit = null) {
    return this.getCompanyDistributionData(limit)
  }
  async getUnavailableProducts (limit) {
    let response = await http.get(ENDPOINT + '/unavailable-products', { params: {limit} })
    return response.data
  }
  async getOrdersByStatus (status, option = {}) {
    let endpoint = ENDPOINT
    switch (status) {
      case 'successful':
        endpoint += '/successful-orders'
        break
      case 'sls':
        endpoint += '/sls-products'
        break
      case 'completed':
        endpoint += '/completed-products'
        break
      case 'pending':
        endpoint += '/pending-products'
        break
    }
    let response = await http.get(endpoint, { params: {...option} })
    return response.data
  }
}

export default new AnalyticService()
