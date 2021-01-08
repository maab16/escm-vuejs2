// import http from '@/app/services/httpClient.js'
import RoleEntity from '@/Modules/Role/role.entity'

class RoleService {
  getRoles () {
    return RoleEntity.getRoles()
  }
}

export default new RoleService()
