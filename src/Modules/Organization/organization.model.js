import { Model } from '@vuex-orm/core'
import User from '@/Modules/User/user.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Organization extends Model {
  static fields () {
    return {
      id: this.uid(),
      buying_lead_id: this.attr(null),
      name: this.string(''),
      email: this.string(),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      users: this.hasMany(User, 'organization_id'),
      buying_lead: this.belongsTo(User, 'buying_lead_id')
    }
  }
}

Organization.entity = 'organizations'

export default Organization
