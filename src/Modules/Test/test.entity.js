import {storage} from '@/app/services/httpClient.js'

const ENDPOINT = 'tests'

class TestEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
}

export default new TestEntity()
