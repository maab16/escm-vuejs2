import {storage} from '@/app/services/httpClient.js'

const ENDPOINT = 'requestDetails'

class RequestDetailsEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
}

export default new RequestDetailsEntity()
