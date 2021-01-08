import { Model } from '@vuex-orm/core'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class RequestLine extends Model {
  static fields () {
    return {
      id: this.uid(),
      order_id: this.attr(),
      product_id: this.attr(),
      qty: this.number(1),
      supplier: this.string(''),
      usd: this.number(0),
      inr: this.number(0),
      prno: this.string(null).nullable(),
      pono: this.string(null).nullable(),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable()
    }
  }
}

RequestLine.entity = 'request_lines'

export default RequestLine
