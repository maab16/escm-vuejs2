// import http from '@/app/services/httpClient.js'
import TokenEntity from './token.entity'

class TestService {
  create (userId, token) {
    TokenEntity.saveToken({ userId, token })
  }
}

export default new TestService()
