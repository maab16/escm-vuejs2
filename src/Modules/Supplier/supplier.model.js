import { Model } from '@vuex-orm/core'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Supplier extends Model {
  static fields () {
    return {
      id: this.uid(),
      name: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable()
    }
  }
}

Supplier.entity = 'suppliers'

export default Supplier
