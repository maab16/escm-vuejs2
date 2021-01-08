import { Model } from '@vuex-orm/core'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class UserAddress extends Model {
  static fields () {
    return {
      id: this.uid(),
      user_id: this.attr(''),
      address_id: this.attr(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable()
    }
  }
}

UserAddress.entity = 'user_address'

export default UserAddress
