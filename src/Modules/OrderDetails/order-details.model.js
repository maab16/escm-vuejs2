import { Model } from '@vuex-orm/core'
import Order from '@/Modules/Order/order.model'
import Product from '@/Modules/Product/product.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class OrderDetails extends Model {
  static fields () {
    return {
      id: this.uid(),
      order_id: this.attr(),
      product_id: this.attr(),
      qty: this.number(1),
      prno: this.string(null).nullable(),
      pono: this.string(null).nullable(),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      order: this.belongsTo(Order, 'order_id'),
      product: this.belongsTo(Product, 'product_id')
    }
  }
}

OrderDetails.entity = 'order_details'

export default OrderDetails
