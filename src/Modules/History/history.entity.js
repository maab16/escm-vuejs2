import {storage} from '@/app/services/httpClient.js'
import History from '@/Modules/History/history.model'
import moment from 'moment'

const ENDPOINT = 'histories'

class HistoryEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  createOrderHistory (user, data) {
    let histories = this.all()
    histories.push({
      id: History.query().max('id') > 0 ? History.query().max('id') + 1 : 1,
      order_id: data.order.id,
      user_id: user.id,
      message: data.message,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    this.store(histories)
  }
  add (history) {
    let histories = this.all()
    histories.push(history)
    this.store(histories)
  }
}

export default new HistoryEntity()
