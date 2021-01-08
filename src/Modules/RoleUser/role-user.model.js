import { Model } from '@vuex-orm/core'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class RoleUser extends Model {
  static fields () {
    return {
      id: this.uid(),
      user_id: this.attr(null),
      role_id: this.attr(null),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable()
    }
  }
}

RoleUser.entity = 'role_user'

export default RoleUser
