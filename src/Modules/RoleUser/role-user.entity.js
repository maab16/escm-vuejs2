import {storage} from '@/app/services/httpClient.js'

const ENDPOINT = 'role_user'

class RoleUserEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
}

export default new RoleUserEntity()
