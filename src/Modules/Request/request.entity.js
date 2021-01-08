import {storage} from '@/app/services/httpClient.js'
import OrderDetailsEntity from '@/Modules/OrderDetails/order-details.entity'
import RequestDetailsEntity from '@/Modules/RequestDetails/request-details.entity'
import Order from '@/Modules/Order/order.model'
import OrderDetails from '@/Modules/OrderDetails/order-details.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'

const ENDPOINT = 'requests'

class RequestEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  update (data) {
    return storage.put(ENDPOINT, data)
  }
  getRequests (option) {
    let {userKey, user, limit} = option

    Order.insert({data: this.all()})
    OrderDetails.insert({data: OrderDetailsEntity.all()})
    RequestDetails.insert({data: RequestDetailsEntity.all()})

    let requestQuery = RequestDetails.query()
      .withAllRecursive()
      .with('order', (query) => {
        if (userKey) {
          query.where(userKey, user.id)
        }
        if (option.address) {
          query.where('address_id', option.address)
        }
        if (option.projectManager) {
          query.where('manager_id', option.projectManager)
        }
        if (option.buyingLead) {
          query.where('buying_lead_id', option.buyingLead)
        }
        if (option.internalBuyer) {
          query.where('internal_buyer_id', option.internalBuyer)
        }
      })
    if (option.customer) {
      requestQuery.where('user_id', option.customer)
    }
    if (option.from) {
      requestQuery.where('created_at', (value) => value >= option.from)
    }
    if (option.to) {
      requestQuery.where('created_at', (value) => value <= option.to)
    }
    if (limit) {
      requestQuery.limit(limit)
    }
    let requests = requestQuery.orderBy('updated_at', 'desc')
      .get()
      .filter(request => {
        if (request.order) {
          return request
        }
      })
    if (option.filter) {
      let search = option.filter.toLowerCase()
      requests = requests.filter(request => {
        if (
          String(request.cas).toLowerCase().indexOf(search) > -1 ||
          String(request.description).toLowerCase().indexOf(search) > -1 ||
          String(request.user.fname).toLowerCase().indexOf(search) > -1 ||
          String(request.user.lname).toLowerCase().indexOf(search) > -1 ||
          String(request.user.organization.name).toLowerCase().indexOf(search) > -1 ||
          (request.order.internal_buyer && String(request.order.internal_buyer.fname).toLowerCase().indexOf(search) > -1) ||
          (request.order.internal_buyer && String(request.order.internal_buyer.lname).toLowerCase().indexOf(search) > -1)
        ) {
          return request
        }
      })
    }

    return requests
  }
}

export default new RequestEntity()
