import http from '@/app/services/httpClient.js'

const ENDPOINT = 'comments'

class CommentService {
  async addOrderComment (user, data) {
    let response = await http.post(ENDPOINT, data)
    return response.data
  }
}

export default new CommentService()
