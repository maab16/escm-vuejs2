import { Model } from '@vuex-orm/core'
import User from '@/Modules/User/user.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class History extends Model {
  static fields () {
    return {
      id: this.uid(),
      order_id: this.attr(null),
      user_id: this.attr(null),
      message: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      user: this.belongsTo(User, 'user_id')
    }
  }
}

History.entity = 'histories'

export default History
