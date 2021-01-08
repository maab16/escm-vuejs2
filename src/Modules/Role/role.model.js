import { Model } from '@vuex-orm/core'
import User from '@/Modules/User/user.model'
import RoleUser from '@/Modules/RoleUser/role-user.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class Role extends Model {
  static fields () {
    return {
      id: this.uid(),
      name: this.string(''),
      slug: this.string(null).nullable(),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      users: this.belongsToMany(User, RoleUser, 'role_id', 'user_id')
    }
  }
}

Role.entity = 'roles'

export default Role
