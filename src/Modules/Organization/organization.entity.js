import {storage} from '@/app/services/httpClient.js'
import Organization from '@/Modules/Organization/organization.model'

const ENDPOINT = 'organizations'

class OrganizationEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  verifyOrganization (params) {
    let {email} = params
    return Organization.query().where('email', email).exists() ? {success: true} : {success: false}
  }
}

export default new OrganizationEntity()
