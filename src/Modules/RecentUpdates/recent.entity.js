import {storage} from '@/app/services/httpClient.js'
import RecentUpdate from './recent.model'
import moment from 'moment'

const ENDPOINT = 'recentUpdates'

class RecentEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  addRecentUpdate (data) {
    let {user, type} = data
    let recents = this.all()
    recents.push({
      id: RecentUpdate.query().max('id') > 0 ? RecentUpdate.query().max('id') + 1 : 1,
      order_id: data.order_id,
      user_id: user.id,
      type: type,
      description: data.message,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    this.store(recents)
  }
  getRecentUpdates (option) {
    let {user, userKey, limit} = option

    RecentUpdate.insert({data: this.all()})

    let recentQuery = RecentUpdate.query()
      .with('user')
      .with('order', (query) => {
        query.where(userKey, user.id)
      })
      .orderBy('updated_at', 'desc')
    if (limit) {
      recentQuery.limit(limit)
    }
    let recents = recentQuery.get()
      .filter(recent => {
        if (recent.order) {
          return recent
        }
      })

    if (option.filter) {
      let search = option.filter.toLowerCase()
      recents = recents.filter(recent => {
        if (
          String(recent.order.id).indexOf(search) > -1 ||
          String(recent.type).toLowerCase().indexOf(search) > -1 ||
          String(recent.user.fname + recent.user.laname).toLowerCase().indexOf(search) > -1 ||
          String(recent.description).toLowerCase().indexOf(search) > -1 ||
          moment(recent.created_at).format('MMM DD, YYYY - HH:mm a').toLowerCase().indexOf(search) > -1
        ) {
          return recent
        }
      })
    }
    return recents
  }
}

export default new RecentEntity()
