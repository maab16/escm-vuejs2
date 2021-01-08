// import http from '@/app/services/httpClient.js'
import OrderDetailsEntity from '@/Modules/OrderDetails/order-details.entity'

class OrderDetailsService {
  update (user, order, product) {
    return OrderDetailsEntity.update(user, order, product)
  }
  getMaxId () {
    return OrderDetailsEntity.getMaxId()
  }
}

export default new OrderDetailsService()
