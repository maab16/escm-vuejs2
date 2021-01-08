import { Model } from '@vuex-orm/core'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Address extends Model {
  static fields () {
    return {
      id: this.uid(),
      line1: this.string(''),
      line2: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable()
    }
  }
}

Address.entity = 'addresses'

export default Address
