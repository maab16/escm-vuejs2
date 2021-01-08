import { Model } from '@vuex-orm/core'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Cart extends Model {
  static fields () {
    return {
      id: this.uid(),
      product_id: this.attr(null),
      qty: this.number(1),
      type: this.string('normal').nullable(),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable()
    }
  }
}

Cart.entity = 'carts'

export default Cart
