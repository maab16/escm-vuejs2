import http from '@/app/services/httpClient.js'

const ENDPOINT = 'contacts'

class ContactService {
  async all () {
    let response = await http.get(ENDPOINT)
    return response.data
  }
  async get (id) {
    let response = await http.get(ENDPOINT + '/' + id)
    return response.data
  }
  async send (data) {
    let response = await http.post(ENDPOINT, data)
    return response.data
  }
}

export default new ContactService()
