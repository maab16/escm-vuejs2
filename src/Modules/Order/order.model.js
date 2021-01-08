import { Model } from '@vuex-orm/core'
import User from '@/Modules/User/user.model'
import Address from '@/Modules/Address/address.model'
import Product from '@/Modules/Product/product.model'
import OrderDetails from '@/Modules/OrderDetails/order-details.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'
import History from '@/Modules/History/history.model'
import Comment from '@/Modules/Comment/comment.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Order extends Model {
  static fields () {
    return {
      id: this.uid(),
      user_id: this.attr(null),
      manager_id: this.attr(null),
      buying_lead_id: this.attr(null),
      internal_buyer_id: this.attr(null),
      address_id: this.attr(null),
      currency: this.string('usd'),
      status: this.string('successful'),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      products: this.belongsToMany(Product, OrderDetails, 'order_id', 'product_id'),
      requests: this.hasMany(RequestDetails, 'order_id'),
      user: this.belongsTo(User, 'user_id'),
      manager: this.belongsTo(User, 'manager_id'),
      buying_lead: this.belongsTo(User, 'buying_lead_id'),
      internal_buyer: this.belongsTo(User, 'internal_buyer_id'),
      address: this.belongsTo(Address, 'address_id'),
      histories: this.hasMany(History, 'order_id'),
      comments: this.hasMany(Comment, 'order_id')
    }
  }
}

Order.entity = 'orders'

export default Order
