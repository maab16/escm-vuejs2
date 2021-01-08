import { Model } from '@vuex-orm/core'
import moment from 'moment'
import User from '@/Modules/User/user.model'
import Order from '@/Modules/Order/order.model'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Recent extends Model {
  static fields () {
    return {
      id: this.uid(),
      order_id: this.attr(null),
      user_id: this.attr(null),
      type: this.string(),
      description: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      order: this.belongsTo(Order, 'order_id'),
      user: this.belongsTo(User, 'user_id')
    }
  }
}

Recent.entity = 'recent_updates'

export default Recent
