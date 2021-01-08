import { Model } from '@vuex-orm/core'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Test extends Model {
  static fields () {
    return {
      id: this.uid(),
      title: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable()
    }
  }
}

Test.entity = 'tests'

export default Test
