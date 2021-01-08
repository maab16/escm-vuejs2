import {storage} from '@/app/services/httpClient.js'

const ENDPOINT = 'faqs'

class FaqEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
}

export default new FaqEntity()
