import {storage} from '@/app/services/httpClient.js'

const ENDPOINT = 'contacts'

class ContactEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  send (data) {
    console.log(data)
  }
}

export default new ContactEntity()
