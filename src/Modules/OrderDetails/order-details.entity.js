import {storage} from '@/app/services/httpClient.js'
import HistoryEntity from '@/Modules/History/history.entity'
import History from '@/Modules/History/history.model'
import OrderDetails from '@/Modules/OrderDetails/order-details.model'
import moment from 'moment'

const ENDPOINT = 'orderDetails'

class OrderDetailsEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  update (user, order, product) {
    let orderDetails = this.all()
    let historyId = History.query().max('id') > 0 ? History.query().max('id') : 0
    orderDetails = orderDetails.map(orderDetail => {
      if (orderDetail.id === product.pivot.id) {
        orderDetail.qty = product.pivot.qty
        if (product.pivot.pono) {
          let poMessage = ''

          if (!orderDetail.pono) {
            poMessage = 'PO added for product ' + product.cas
          } else if (orderDetail.pono !== product.pivot.pono) {
            poMessage = 'PO updated for product ' + product.cas
          }

          if (poMessage) {
            HistoryEntity.add({
              id: ++historyId,
              order_id: order.id,
              user_id: user.id,
              message: poMessage,
              created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
              updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            })
          }
        }

        if (product.pivot.prno) {
          let prMessage = ''
          if (!orderDetail.prno) {
            prMessage = 'PR added for product ' + product.cas
          } else if (orderDetail.prno != product.pivot.prno) {
            prMessage = 'PR updated for product ' + product.cas
          }

          if (prMessage) {
            HistoryEntity.add({
              id: ++historyId,
              order_id: order.id,
              user_id: user.id,
              message: prMessage,
              created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
              updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            })
          }
        }
        orderDetail.prno = product.pivot.prno
        orderDetail.pono = product.pivot.pono
        orderDetail.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
        order.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
      }
      return orderDetail
    })
    this.store(orderDetails)
  }
  getMaxId () {
    return OrderDetails.query().max('id')
  }
}

export default new OrderDetailsEntity()
