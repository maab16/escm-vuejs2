import http from '@/app/services/httpClient.js'

const ENDPOINT = 'requests'

class RequestService {
  async getRequests (option = {}, limit = null) {
    option.limit = limit
    let response = await http.get(ENDPOINT, {
      params: option
    })
    return response.data
  }
}

export default new RequestService()
