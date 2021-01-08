import {storage} from '@/app/services/httpClient.js'
import store from '@/store'
import User from '@/Modules/User/user.model'
// import Role from '@/Modules/Role/role.model'
import Product from '@/Modules/Product/product.model'
import Order from '@/Modules/Order/order.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'
import Organization from '@/Modules/Organization/organization.model'
import RequestLine from '@/Modules/RequestDetails/request-line.model'
import moment from 'moment'
import UserEntity from '@/Modules/User/user.entity'
import ProductEntity from '@/Modules/Product/product.entity'
import OrderEntity from '@/Modules/Order/order.entity'
import RequestDetailsEntity from '@/Modules/RequestDetails/request-details.entity'
import RequestLineEntity from '@/Modules/RequestDetails/request-line.entity'

const ENDPOINT = 'analytics'

class AnalyticEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  getAnalyticOrders (params) {
    let loggedUser = params.user
    let limit = params.limit
    let isManager = store.getters['user/isManager']
    let isBuyingLead = store.getters['user/isBuyingLead']
    let customerOrders = []

    User.insert({data: UserEntity.all()})
    Product.insert({data: ProductEntity.all()})
    Order.insert({data: OrderEntity.all()})
    RequestDetails.insert({data: RequestDetailsEntity.all()})

    let users = User.query().withAllRecursive().get()
    let query = Order.query().withAllRecursive()
    let userKey = ''
    if (isManager) {
      userKey = 'manager_id'
      query.where('manager_id', loggedUser.id)
    } else if (isBuyingLead) {
      userKey = 'buying_lead_id'
      query.where('buying_lead_id', loggedUser.id)
    }
    let orders = query.get()
    // let orders = {
    //   total: items.sort((order1, order2) => {
    //     return order1.total < order2.total ? 1 : order1.total > order2.total ? -1 : 0
    //   }),
    //   successful: items.map(order => {
    //     return order.status === 'successful' ? order : null
    //   }).filter(order => order),
    //   completed: items.map(order => {
    //     return order.status === 'completed' ? order : null
    //   }).filter(order => order),
    //   sls: items.map(order => {
    //     return order.status === 'sls' ? order : null
    //   }).filter(order => order),
    //   pending: items.map(order => {
    //     return order.status === 'pending' ? order : null
    //   }).filter(order => order)
    // }
    users.map(user => {
      let userOrders = user.orders.filter(order => {
        switch (userKey) {
          case 'buying_lead_id':
            return order.buying_lead_id === loggedUser.id ? order : null
          case 'manager_id':
            return order.manager_id === loggedUser.id ? order : null
          default:
            return order
        }
      })

      if (userOrders.length > 0) {
        customerOrders.push({
          name: user.fname + ' ' + user.lname,
          orders: userOrders,
          total: userOrders.length,
          successful: userOrders.filter(order => {
            if (isManager) {
              return (order.manager_id === loggedUser.id && order.status === 'successful') ? order : null
            } else if (isBuyingLead) {
              return (order.buying_lead_id === loggedUser.id && order.status === 'successful') ? order : null
            }
            return order.status === 'successful' ? order : null
          }),
          completed: userOrders.filter(order => {
            if (isManager) {
              return (order.manager_id === loggedUser.id && order.status === 'completed') ? order : null
            } else if (isBuyingLead) {
              return (order.buying_lead_id === loggedUser.id && order.status === 'completed') ? order : null
            }
            return order.status === 'completed' ? order : null
          }),
          sls: userOrders.filter(order => {
            if (isManager) {
              return (order.manager_id === loggedUser.id && order.status === 'sls') ? order : null
            } else if (isBuyingLead) {
              return (order.buying_lead_id === loggedUser.id && order.status === 'sls') ? order : null
            }
            return order.status === 'sls' ? order : null
          }),
          pending: RequestDetails
            .query()
            .withAllRecursive()
            .where('user_id', user.id)
            .get()
            .filter(orderDetail => {
              if (isManager) {
                return (orderDetail.order.manager_id === loggedUser.id) ? orderDetail : null
              } else if (isBuyingLead) {
                return (orderDetail.order.buying_lead_id === loggedUser.id) ? orderDetail : null
              }
              return orderDetail
            })
        })
      }
    })
    customerOrders = customerOrders.sort((order1, order2) => {
      return order1.total < order2.total ? 1 : order1.total > order2.total ? -1 : 0
    })

    if (limit && customerOrders.length > limit) {
      customerOrders = customerOrders.splice(0, limit)
    }

    return {
      orders,
      customerOrders
    }
  }
  getPopularProducts (params) {
    let {user, limit} = params
    let isManager = store.getters['user/isManager']
    let isBuyingLead = store.getters['user/isBuyingLead']
    let userKey = ''

    if (isManager) {
      userKey = 'manager_id'
    } else if (isBuyingLead) {
      userKey = 'buying_lead_id'
    }

    Product.insert({data: ProductEntity.all()})
    let products = Product
      .query()
      .withAllRecursive()
      .get()
      .filter(product => {
        if (userKey) {
          product.orders = product.orders.filter(orderDetail => orderDetail.order[userKey] === user.id)
        }
        return product
      })
      .filter(product => product.orders.length > 0)
      .sort((product1, product2) => {
        return product1.orders.length < product2.orders.length
          ? 1 : product1.orders.length > product2.orders.length ? -1 : 0
      })
    if (limit && products.length > limit) {
      return products.splice(0, limit)
    }
    return products
  }
  getOrdersByMonth (params) {
    let loggedUser = params.user
    let months = params.months
    let isManager = store.getters['user/isManager']
    let isBuyingLead = store.getters['user/isBuyingLead']
    let data = []

    for (let i = Number(months) - 1; i >= 0; i--) {
      let firstDay = moment().subtract(i, 'months').date(1)
      let lastDay = moment().subtract((i - 1), 'months').date(0)
      let from = firstDay.format('YYYY-MM-DD HH:mm:ss')
      let to = lastDay.format('YYYY-MM-DD HH:mm:ss')
      let query = Order.query()
      if (isManager) {
        query.where('manager_id', loggedUser.id)
      } else if (isBuyingLead) {
        query.where('buying_lead_id', loggedUser.id)
      }
      let orders = query.where('created_at', (value) => value >= from)
        .where('created_at', (value) => value <= to)
        .get()
      let completed = orders.filter(order => order.status === 'completed')
      let sls = orders.filter(order => order.status === 'sls')
      data.push({
        month: firstDay.format("MMM'YY"),
        completed: completed,
        sls: sls
      })
    }

    return data
  }
  getCompanyDistributionData (params) {
    let loggedUser = params.user
    let limit = params.limit
    let isManager = store.getters['user/isManager']
    let isBuyingLead = store.getters['user/isBuyingLead']
    let organizations = Organization.query().withAllRecursive().get()

    let data = []
    organizations.forEach(organization => {
      let total = 0
      organization.users.forEach(user => {
        let orders = user.orders.filter(order => {
          if (isManager) {
            return order.manager_id === loggedUser.id ? order : null
          } else if (isBuyingLead) {
            return order.buying_lead_id === loggedUser.id ? order : null
          }
          return order
        })
        total += orders.length
      })

      if (total > 0) {
        data.push({
          name: organization.name,
          total: total
        })
      }
    })

    data = data.sort((company1, company2) => {
      return company1.total < company2.total
        ? 1 : company1.total > company2.total ? -1 : 0
    })

    if (limit && data.length > limit) {
      return data.splice(0, limit)
    }
    return data
  }
  getUnavailableOrdersByMonth (params) {
    let loggedUser = params.user
    let months = params.months
    let data = []
    for (let i = Number(months) - 1; i >= 0; i--) {
      let firstDay = moment().subtract(i, 'months').date(1)
      let lastDay = moment().subtract((i - 1), 'months').date(0)
      let from = firstDay.format('YYYY-MM-DD HH:mm:ss')
      let to = lastDay.format('YYYY-MM-DD HH:mm:ss')
      let orders = RequestDetails
        .query()
        .withAllRecursive()
        .where('created_at', (value) => value >= from)
        .where('created_at', (value) => value <= to)
      // .where('delivered_at', (value) => value != null)
        .get()

      orders = orders.map(item => item['cas'])
        .map((item, index, final) => final.indexOf(item) === index && index)
        .filter(item => orders[item])
        .map(item => orders[item])

      data.push({
        month: firstDay.format("MMM'YY"),
        orders: orders.filter(orderDetail => {
          let isManager = store.getters['user/isManager']
          let isBuyingLead = store.getters['user/isBuyingLead']
          if (isManager) {
            return orderDetail.order.manager_id === loggedUser.id ? orderDetail : null
          } else if (isBuyingLead) {
            return orderDetail.order.buying_lead_id === loggedUser.id ? orderDetail : null
          }
          return orderDetail
        })
      })
    }
    return data
  }
  getInternalBuyerOrdersByMonth (params) {
    let loggedUser = params.user
    let isBuyingLead = store.getters['user/isBuyingLead']
    let data = []
    let user = User.query()
      .withAllRecursive()
      .where('id', loggedUser.id)
      .first()
    if (user) {
      let orders = []
      let buyers = user.buyers
      if (!buyers || buyers.length < 1) {
        // buyers = Role.query().withAllRecursive().where('slug', 'internal-buyer').first().users
        buyers = User.query()
          .withAllRecursive()
          .with('roles', (query) => {
            query.where('slug', 'internal-buyer').orWhere('slug', 'buying-lead')
          })
          .get()
          .filter(userData => userData.roles.length > 0)
      }
      if (isBuyingLead) {
        data.push({
          name: user.fname + ' ' + user.lname,
          orders: user.bl_orders.filter(blOrder => !blOrder.internal_buyer_id)
        })
      }
      buyers.forEach(item => {
        let buyer = item
        if (isBuyingLead) {
          buyer = item.buyer
        }

        orders = buyer.ib_orders
        if (!isBuyingLead) {
          item.roles.forEach(role => {
            if (role.name === 'BuyingLead_Security_default') {
              orders = buyer.bl_orders.filter(blOrd => !blOrd.internal_buyer_id)
            }
          })
        }
        if (isBuyingLead) {
          orders = orders.filter(order => order.buying_lead_id === loggedUser.id)
        }
        data.push({
          name: buyer.fname + ' ' + buyer.lname,
          orders: orders
        })
      })
    }
    return data.filter(buyer => buyer.orders.length > 0)
  }
  getCompanyDataByBuyer (params) {
    return this.getCompanyDistributionData(params)
  }
  getUnavailableProducts (params) {
    let {user, limit} = params
    let isManager = store.getters['user/isManager']
    let isBuyingLead = store.getters['user/isBuyingLead']
    let userKey = ''

    if (isManager) {
      userKey = 'manager_id'
    } else if (isBuyingLead) {
      userKey = 'buying_lead_id'
    }

    let requests = RequestDetails.query()
      .withAllRecursive()
      .orderBy('updated_at', 'desc')
      .get()

    if (userKey) {
      requests = requests.filter(requestDetail => requestDetail.order[userKey] === user.id)
    }

    requests = requests.map(item => item['cas'])
      .map((item, index, final) => final.indexOf(item) === index && index)
      .filter(item => requests[item])
      .map(item => requests[item])
    if (limit && requests.length > limit) {
      return requests.splice(0, limit)
    }
    return requests
  }
  getOrdersByStatus (option) {
    console.log(option)
    let status = option.status
    let loggedUser = option.user
    let isManager = store.getters['user/isManager']
    let isBuyingLead = store.getters['user/isBuyingLead']

    RequestLine.insert({data: RequestLineEntity.all()})
    let query = Order.query().withAllRecursive()

    if (isManager) {
      query.where('manager_id', loggedUser.id)
    } else if (isBuyingLead) {
      query.where('buying_lead_id', loggedUser.id)
    }

    if (option.customer) {
      query.where('user_id', option.customer)
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

    if (option.from) {
      query.where('created_at', (value) => value >= moment(option.from).format('YYYY-MM-DD HH:mm:ss'))
    }

    if (option.to) {
      query.where('created_at', (value) => value <= moment(option.to).format('YYYY-MM-DD HH:mm:ss'))
    }

    let results = []
    let orders = query.get()

    if (status === 'successful') {
      // orders.forEach(order => {
      //   order.products.forEach(product => {
      //     results.push(product)
      //   })
      // })

      return orders.filter(order => order.status === 'successful')
    }

    if (status === 'sls') {
      orders.forEach(order => {
        order.requests.forEach(request => {
          results.push(request)
        })
      })
    }

    if (status === 'completed') {
      orders.forEach(order => {
        order.requests.forEach(request => {
          request.lines = RequestLine
            .query()
            .withAllRecursive()
            .where('product_id', request.id)
            .where('order_id', order.id)
            .get()
            .filter(line => line.product_id === request.id && line.order_id === order.id)
          if (request.lines.length > 0) {
            let isDirty = false
            request.lines.forEach(line => {
              if (line.prno || line.pono) {
                isDirty = true
              }
            })
            if (isDirty) {
              results.push(request)
            }
          }
        })
      })
    }
    if (status === 'pending') {
      orders.forEach(order => {
        order.requests.forEach(request => {
          request.lines = RequestLine
            .query()
            .withAllRecursive()
            .where('product_id', request.id)
            .where('order_id', order.id)
            .get()
            .filter(line => line.product_id === request.id && line.order_id === order.id)
          if (request.lines.length < 1) {
            results.push(request)
          } else if (request.lines.length > 0) {
            let isDirty = false
            request.lines.forEach(line => {
              if (line.prno || line.pono) {
                isDirty = true
              }
            })
            if (!isDirty) {
              results.push(request)
            }
          }
        })
      })
    }
    return results
  }
}

export default new AnalyticEntity()
