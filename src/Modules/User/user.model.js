import { Model } from '@vuex-orm/core'
import Address from '@/Modules/Address/address.model'
import UserAddress from '@/Modules/User/user-address.model'
import Organization from '@/Modules/Organization/organization.model'
import Role from '@/Modules/Role/role.model'
import BuyerLead from '@/Modules/Role/buyer-lead.model'
import RoleUser from '@/Modules/RoleUser/role-user.model'
import Order from '@/Modules/Order/order.model'
import Notification from '@/Modules/Notification/notification.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class User extends Model {
  static fields () {
    return {
      id: this.uid(),
      organization_id: this.attr(null),
      email: this.string(''),
      fname: this.string(''),
      lname: this.string(''),
      phone: this.string(''),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      addresses: this.belongsToMany(Address, UserAddress, 'user_id', 'address_id'),
      roles: this.belongsToMany(Role, RoleUser, 'user_id', 'role_id'),
      buyers: this.hasMany(BuyerLead, 'buying_lead_id'),
      organization: this.belongsTo(Organization, 'organization_id'),
      orders: this.hasMany(Order, 'user_id'),
      ib_orders: this.hasMany(Order, 'internal_buyer_id'),
      bl_orders: this.hasMany(Order, 'buying_lead_id'),
      pm_orders: this.hasMany(Order, 'manager_id'),
      notifications: this.hasMany(Notification, 'user_id')
    }
  }
}

User.entity = 'users'

export default User
