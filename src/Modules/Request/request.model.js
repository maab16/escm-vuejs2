import { Model } from '@vuex-orm/core'
import User from '@/Modules/User/user.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Request extends Model {
  static fields () {
    return {
      id: this.uid(),
      user_id: this.attr(null),
      status: this.string('reviewing'),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      requests: this.hasMany(RequestDetails, 'request_id'),
      user: this.belongsTo(User, 'user_id')
    }
  }
}

Request.entity = 'requests'

export default Request
