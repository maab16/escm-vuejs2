import http from '@/app/services/httpClient.js'

const ENDPOINT = 'organizations'

class OrganizationService {
  async verifyOrganization (email) {
    let response = await http.get(ENDPOINT + '/verify/' + email)
    return response.data
  }
}

export default new OrganizationService()
