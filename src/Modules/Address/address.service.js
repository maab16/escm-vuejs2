import {storage} from '@/app/services/httpClient.js'
import http from '@/app/services/httpClient'

const ENDPOINT = 'addresses'

class AddressService {
  async getAddresses () {
    let response = await http.get(ENDPOINT)
    return response.data
  }
}

export default new AddressService()
