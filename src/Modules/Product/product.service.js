import http from '@/app/services/httpClient.js'
import ProductEntity from './product.entity'

const ENDPOINT = 'products'

class ProductService {
  async isAvailable (id) {
    let response = await http.get(ENDPOINT + '/available/' + id)
    return response.data
  }
  async checkAvailabilty (carts) {
    let response = await http.get(ENDPOINT + '/check-availability', { params: {carts} })
    return response.data
  }
  async getSearchKeywords (search = '') {
    try {
      let response = await http.get(ENDPOINT + '/keywords/' + search, { params: {limit: process.env.SEARCH_LIMIT} })
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
  async getAdvancedSearchProducts (data) {
    let response = await http.get(ENDPOINT + '/filter', { params: {data} })
    return response.data
  }
  async getProduct (id) {
    let response = await http.get(ENDPOINT + '/' + id)
    return response.data
  }
  // Only for frontend
  getProducts (data) {
    return ProductEntity.getProducts(data)
  }
  getProductsByCas (cas) {
    return ProductEntity.getProductsByCas(cas)
  }
  getAdavacedOptions (tags, option) {
    return ProductEntity.getAdavacedOptions(tags, option)
  }
}

export default new ProductService()
