import http from '@/app/services/httpClient.js'

const ENDPOINT = 'recent/updates'

class RecentUpdateService {
  async addRecentUpdate (user, data, type = 'comment') {
    data.type = type
    let response = await http.post(ENDPOINT, data)
    return response.data
  }
  async getRecentUpdates (user, userKey, option, limit = null) {
    let params = {...{userKey}, ...option, ...{limit}}
    let res = await http.get(ENDPOINT, { params: params })
    console.log(res)
    return res.data
  }
}

export default new RecentUpdateService()
