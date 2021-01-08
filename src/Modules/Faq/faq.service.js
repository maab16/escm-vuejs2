import http from '@/app/services/httpClient.js'

const ENDPOINT = 'faqs'

class FaqService {
  async all () {
    let response = await http.get(ENDPOINT)
    console.log(response.data)
    return response.data
  }
}

export default new FaqService()
