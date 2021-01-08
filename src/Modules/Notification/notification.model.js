import { Model } from '@vuex-orm/core'
import User from '@/Modules/User/user.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Notification extends Model {
  static fields () {
    return {
      id: this.uid(),
      user_id: this.attr(null),
      title: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      user: this.belongsTo(User, 'user_id')
    }
  }
}

Notification.entity = 'notifications'

export default Notification
