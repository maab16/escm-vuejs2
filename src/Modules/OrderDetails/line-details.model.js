import { Model } from '@vuex-orm/core'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class LineDetails extends Model {
  static fields () {
    return {
      id: this.uid(),
      product_id: this.attr(),
      order_id: this.attr(),
      usd: this.number(0),
      inr: this.number(0),
      qty: this.number(1),
      pono: this.string(null).nullable(),
      prno: this.string(null).nullable(),
      supplier: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable()
    }
  }
}

LineDetails.entity = 'order_lines'

export default LineDetails
