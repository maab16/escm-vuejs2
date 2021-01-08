import { Model } from '@vuex-orm/core'
import User from '@/Modules/User/user.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class BuyerLead extends Model {
  static fields () {
    return {
      id: this.uid(),
      buying_lead_id: this.attr(null),
      internal_buyer_id: this.attr(null),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      buyer: this.belongsTo(User, 'internal_buyer_id')
    }
  }
}

BuyerLead.entity = 'buyer_lead'

export default BuyerLead
