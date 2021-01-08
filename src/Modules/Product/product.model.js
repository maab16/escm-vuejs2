import { Model } from '@vuex-orm/core'
import OrderDetails from '@/Modules/OrderDetails/order-details.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Product extends Model {
  static fields () {
    return {
      id: this.uid(),
      cas: this.string(''),
      name: this.string(''),
      equation: this.string(''),
      purity: this.string(''),
      supplier: this.string(''),
      catalogue: this.string(''),
      delivery: this.string(''),
      warehouse: this.string(''),
      packsize: this.string(''),
      availability: this.number(0),
      usd: this.number(0),
      inr: this.number(0),
      qty: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      orders: this.hasMany(OrderDetails, 'product_id')
    }
  }
}

Product.entity = 'products'

export default Product
