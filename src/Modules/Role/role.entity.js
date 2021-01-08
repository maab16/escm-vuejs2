import {storage} from '@/app/services/httpClient.js'
import Role from './role.model'

const ENDPOINT = 'roles'

class RoleEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  getRoles () {
    let roles = this.all()
    Role.insert({data: roles})
    return Role.query().withAll().get()
  }
}

export default new RoleEntity()
