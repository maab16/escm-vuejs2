import http, {storage} from '@/app/services/httpClient.js'
import HistoryService from '@/Modules/History/history.service'
import LineDetails from '@/Modules/OrderDetails/line-details.model'
import History from '@/Modules/History/history.model'
import moment from 'moment'

const ENDPOINT = 'order_lines'

class OrderLineService {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  update (data) {
    return storage.put(ENDPOINT, data)
  }
  add (data) {
    let lines = this.all()
    LineDetails.insert({data: lines})
    lines.push(data)
    this.store(lines)
  }
  addOrUpdate (user, order, product, data) {
    let lines = this.all()
    lines = lines.map(line => {
      if (data && line.id === data.id) {
        this.sendNotification(user, order, product, data, line)
        let item = {...data}
        data = null
        return item
      }
      return line
    })

    if (data) {
      lines.push(data)
      this.sendNotification(user, order, product, data)
    }
    return http.post(ENDPOINT, lines)
  }
  sendNotification (user, order, product, data, line = null) {
    History.insert({data: HistoryService.all()})
    let historyId = History.query().max('id') > 0 ? History.query().max('id') : 0
    if (line) {
      if (data.pono !== line.pono) {
        historyId++
        // Update PO Notification
        HistoryService.add({
          id: historyId,
          order_id: order.id,
          user_id: user.id,
          message: 'PO updated for Product ' + product.id,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      if (data.prno !== line.prno) {
        historyId++
        // Update PR Notification
        HistoryService.add({
          id: historyId,
          order_id: order.id,
          user_id: user.id,
          message: 'PR updated for Product ' + product.id,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    } else {
      if (data.pono) {
        historyId++
        // Added new PO Notificatio
        HistoryService.add({
          id: historyId,
          order_id: order.id,
          user_id: user.id,
          message: 'PO added for Product ' + product.id,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      if (data.prno) {
        historyId++
        // Added new PR Notification
        HistoryService.add({
          id: historyId,
          order_id: order.id,
          user_id: user.id,
          message: 'PR added for Product ' + product.id,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    }
  }
}

export default new OrderLineService()
