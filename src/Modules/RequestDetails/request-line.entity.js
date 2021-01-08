import {storage} from '@/app/services/httpClient.js'
import RequestLine from '@/Modules/RequestDetails/request-line.model'

const ENDPOINT = 'request_lines'

class RequestLineEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  update (data) {
    let lines = this.all()
    lines = lines.map(line => {
      if (line.id === data.id) {
        return {...data}
      }
      return line
    })
    return storage.post(ENDPOINT, lines)
  }
  add (data) {
    let lines = this.all()
    RequestLine.insert({data: lines})
    // data.id = RequestLine.query().max('id') > 0 ? RequestLine.query().max('id') + 1 : 1
    lines.push(data)
    this.store(lines)
  }
  addOrUpdate (user, order, data) {
    let lines = this.all()
    lines = lines.map(line => {
      if (data && line.id === data.id) {
        let item = {...data}
        data = null
        return item
      }
      return line
    })

    if (data) {
      RequestLine.insert({data: lines})
      lines.push({
        id: RequestLine.query().max('id') > 0 ? RequestLine.query().max('id') + 1 : 1,
        order_id: data.order_id,
        product_id: data.product_id,
        qty: data.qty,
        supplier: data.supplier,
        usd: data.usd,
        inr: data.inr,
        prno: data.prno,
        pono: data.pono
      })
    }
    return this.store(lines)
  }
}

export default new RequestLineEntity()
