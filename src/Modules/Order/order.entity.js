import {storage} from '@/app/services/httpClient.js'
import UserEntity from '@/Modules/User/user.entity'
import CommentEntity from '@/Modules/Comment/comment.entity'
import HistoryEntity from '@/Modules/History/history.entity'
import OrderDetailsEntity from '@/Modules/OrderDetails/order-details.entity'
import RequestDetailsEntity from '@/Modules/RequestDetails/request-details.entity'
// import OrderLineEntity from '@/Modules/OrderDetails/order-line.entity'
import RequestLineEntity from '@/Modules/RequestDetails/request-line.entity'
import NotificationEntity from '@/Modules/Notification/notification.entity'
import User from '@/Modules/User/user.model'
import Order from '@/Modules/Order/order.model'
import OrderDetails from '@/Modules/OrderDetails/order-details.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'
import History from '@/Modules/History/history.model'
import Comment from '@/Modules/Comment/comment.model'
import LineDetails from '@/Modules/OrderDetails/line-details.model'
// import Product from '@/Modules/Product/product.model'
import RequestLine from '@/Modules/RequestDetails/request-line.model'

import moment from 'moment'

const ENDPOINT = 'orders'

class OrderEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  update (data) {
    return storage.put(ENDPOINT, data)
  }
  createOrder (data) {
    let {user} = data
    let orderDetails = OrderDetailsEntity.all()
    let requestDetails = RequestDetailsEntity.all()
    let orders = this.all()
    let histories = HistoryEntity.all()

    let orderId = Order.query().max('id') + 1
    let order = {
      id: orderId,
      user_id: user.id,
      buying_lead_id: user.organization.buying_lead_id,
      status: 'successful',
      address_id: data.address_id,
      currency: data.currency,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    orders.push(order)

    let orderDetailsMaxId = OrderDetails.query().max('id')
    data.products.map(product => {
      orderDetails.push({
        id: ++orderDetailsMaxId,
        order_id: orderId,
        product_id: product.id,
        qty: product.qty,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    })

    let requestDetailsMaxId = RequestDetails.query().max('id')
    data.requests.map(product => {
      requestDetails.push({
        id: ++requestDetailsMaxId,
        user_id: user.id,
        order_id: orderId,
        cas: product.cas,
        qty: product.qty,
        purity: product.purity,
        description: product.description,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    })

    histories.push({
      id: History.query().max('id') > 0 ? History.query().max('id') + 1 : 1,
      order_id: orderId,
      user_id: user.id,
      message: 'Order placed',
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })

    this.store(orders)
    OrderDetailsEntity.store(orderDetails)
    RequestDetailsEntity.store(requestDetails)
    HistoryEntity.store(histories)

    Order.insert({data: this.all()})
    OrderDetails.insert({data: OrderDetailsEntity.all()})
    RequestDetails.insert({data: RequestDetailsEntity.all()})

    let orderData = Order.query().withAllRecursive().where('id', order.id).first()

    let companyName = 'Sailife'
    let buyingLead = orderData.buying_lead

    let users = User.query().withAllRecursive()
      .with('roles', (query) => {
        query.where('slug', 'admin').orWhere('slug', 'supplier-manager').get()
      })
      .get()
      .filter(userData => userData.roles.length > 0)

    users.forEach(customerUser => {
      NotificationEntity.send('general_notification', {
        title: 'Order Placed Success',
        name: customerUser.fname + ' ' + customerUser.lname,
        email: customerUser.email,
        order_id: orderId,
        company_name: companyName,
        reply_to: 'no-reply@sailife.com',
        message: 'You\'ve a new order from ' + companyName + '. The order number is ' + orderId + '. Please login in ' + companyName + ' and check your order details.'
      })
    })

    NotificationEntity.send('general_notification', {
      title: 'Order Placed Success',
      name: buyingLead.fname + ' ' + buyingLead.lname,
      email: buyingLead.email,
      order_id: orderId,
      company_name: companyName,
      reply_to: 'no-reply@sailife.com',
      message: 'You\'ve a new order from ' + companyName + '. The order number is ' + orderId + '. Please login in ' + companyName + ' and check your order details.'
    })

    NotificationEntity.send('general_notification', {
      title: 'Order Placed Success',
      name: user.fname + ' ' + user.lname,
      email: user.email,
      order_id: orderId,
      company_name: companyName,
      reply_to: 'no-reply@sailife.com',
      message: 'You placed a new order successfyll in ' + companyName + '. Your order number is ' + orderId + '. Please login in ' + companyName + ' and check your order details.'
    })

    return orderData
  }
  getOrders (option) {
    let { userKey, user, limit } = option
    Order.insert({data: this.all()})
    OrderDetails.insert({data: OrderDetailsEntity.all()})
    RequestDetails.insert({data: RequestDetailsEntity.all()})

    let query = Order.query().withAllRecursive()

    if (userKey) {
      query.where(userKey, user.id)
    }
    if (option.address) {
      query.where('address_id', option.address)
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
      query.where('created_at', (value) => value >= option.from)
    }
    if (option.to) {
      query.where('created_at', (value) => value <= option.to)
    }
    if (limit) {
      query.limit(limit)
    }
    query.orderBy('updated_at', 'desc')
    let orders = query.get()
    if (option.filter) {
      let search = String(option.filter).toLowerCase()
      orders = orders.filter(order => {
        if (
          Number(order.id) === Number(search) ||
          String(order.address.line1).toLowerCase().indexOf(search) > -1 ||
          String(order.address.line2).toLowerCase().indexOf(search) > -1 ||
          String(order.status).toLowerCase().indexOf(search) > -1 ||
          (order.user && order.user.fname.toLowerCase().indexOf(search) > -1) ||
          (order.user && order.user.lname.toLowerCase().indexOf(search) > -1) ||
          (order.manager && order.manager.fname.toLowerCase().indexOf(search) > -1) ||
          (order.manager && order.manager.lname.toLowerCase().indexOf(search) > -1) ||
          (order.buying_lead && order.buying_lead.fname.toLowerCase().indexOf(search) > -1) ||
          (order.buying_lead && order.buying_lead.lname.toLowerCase().indexOf(search) > -1) ||
          (order.internal_buyer && order.internal_buyer.fname.toLowerCase().indexOf(search) > -1) ||
          (order.internal_buyer && order.internal_buyer.lname.toLowerCase().indexOf(search) > -1)
        ) {
          return order
        }
      })
    }

    return orders
  }
  getOrder (params) {
    let id = params.id
    Order.insert({data: this.all()})
    OrderDetails.insert({data: OrderDetailsEntity.all()})
    RequestDetails.insert({data: RequestDetailsEntity.all()})
    History.insert({data: HistoryEntity.all()})
    Comment.insert({data: CommentEntity.all()})

    let order = Order.query()
      .withAllRecursive(5)
      .with('comments', (query) => {
        query.orderBy('updated_at', 'desc')
      })
      .where('id', Number(id))
      .first()

    // LineDetails.insert({data: OrderLineEntity.all()})
    RequestLine.insert({data: RequestLineEntity.all()})

    // console.log(RequestLineEntity.all())
    // console.log(RequestLine.all())

    // order.products = order.products.map(product => {
    //   product.lines = Product.query().withAllRecursive().where('id', product.id).first().lines
    //   product.lines = product.lines.filter(line => line.product_id === product.id && line.order_id === order.id)
    //   console.log(product.lines.length)
    //   if (product.lines.length < 1) {
    //     product.lines.push({
    //       id: LineDetails.query().max('id') > 0 ? LineDetails.query().max('id') + 1 : 1,
    //       order_id: order.id,
    //       product_id: product.id,
    //       qty: product.pivot.qty,
    //       supplier: product.supplier,
    //       usd: product.usd,
    //       inr: product.inr,
    //       prno: '',
    //       pono: ''
    //     })
    //   }
    //   console.log(product)
    //   return product
    // })

    if (order) {
      order.requests = order.requests.map(product => {
        product.lines = RequestLine
          .query()
          .withAllRecursive()
          .where('product_id', product.id)
          .where('order_id', order.id)
          .get()
          .filter(line => line.product_id === product.id && line.order_id === order.id)
        // console.log(product.lines)
        if (product.lines.length < 1) {
          product.lines.push({
            id: LineDetails.query().max('id') > 0 ? LineDetails.query().max('id') + 1 : 1,
            order_id: order.id,
            product_id: product.id,
            qty: product.qty,
            supplier: product.supplier,
            usd: product.usd,
            inr: product.inr,
            prno: '',
            pono: ''
          })
        }
        return product
      })
    }

    return order
  }
  getInternalBuyers (params) {
    let id = params.id
    User.insert({data: UserEntity.all()})

    return User.query().withAllRecursive().where('id', Number(id)).first().buyers
  }
  updateOrder (data) {
    let buyingLead = User.query().withAllRecursive().where('id', data.buying_lead_id).first()
    let internalBuyerId = null
    if (buyingLead) {
      buyingLead.buyers.forEach(buyer => {
        if (buyer.internal_buyer_id === data.internal_buyer_id) {
          internalBuyerId = data.internal_buyer_id
        }
      })
    }

    Order.query()
      .withAllRecursive()
      .get()
      .forEach(order => {
        if (order.id === data.id) {
          let user = null
          let message = ''
          let companyName = 'Sailife'
          let historyMessages = []

          if (!order.manager_id && data.manager_id) {
            user = User.find(data.manager_id)
            message = 'You\'ve assigned as a project manager to order ' + data.id + ' in ' + companyName + '. Please login in ' + companyName + ' and check your order details.'
            historyMessages.push('Project Manager Assigned: ' + user.fname + ' ' + user.lname)
          } else if (order.manager_id && data.manager_id && order.manager_id !== data.manager_id) {
            user = User.find(data.manager_id)
            message = 'You\'ve assigned as a project manager to order ' + data.id + ' in ' + companyName + '. Please login in ' + companyName + ' and check your order details.'
            historyMessages.push('Project Manager Changed: ' + user.fname + ' ' + user.lname)
          } else if (order.manager_id && !data.manager_id) {
            user = User.find(order.manager_id)
            message = 'You\'ve revoked from order ' + data.id + ' in ' + companyName + '. Please login in ' + companyName + ' and check your order details.'
            historyMessages.push('Project Manager Revoked: ' + user.fname + ' ' + user.lname)
          }

          if (!order.buying_lead_id && data.buying_lead_id) {
            user = User.find(data.buying_lead_id)
            message = 'You\'ve assigned as a project manager to order ' + data.id + ' in ' + companyName + '. Please login in ' + companyName + ' and check your order details.'
            historyMessages.push('Buying Lead Assigned: ' + user.fname + ' ' + user.lname)
          } else if (order.buying_lead_id && data.buying_lead_id && order.buying_lead_id !== data.buying_lead_id) {
            user = User.find(data.buying_lead_id)
            message = 'You\'ve assigned as a project manager to order ' + data.id + ' in ' + companyName + '. Please login in ' + companyName + ' and check your order details.'
            historyMessages.push('Buying Lead Changed: ' + user.fname + ' ' + user.lname)
          } else if (order.buying_lead_id && !data.buying_lead_id) {
            user = User.find(order.buying_lead_id)
            historyMessages.push('Buying Lead Revoked: ' + user.fname + ' ' + user.lname)
          }

          if (!order.internal_buyer_id && data.internal_buyer_id) {
            user = User.find(data.internal_buyer_id)
            message = 'You\'ve assigned as an internal buyer to order ' + data.id + ' in ' + companyName + '. Please login in ' + companyName + ' and check your order details.'
            historyMessages.push('Internal Buyer Assigned: ' + user.fname + ' ' + user.lname)
          } else if (order.internal_buyer_id && data.internal_buyer_id && order.internal_buyer_id !== data.internal_buyer_id) {
            user = User.find(data.internal_buyer_id)
            message = 'You\'ve assigned as an internal buyer to order ' + data.id + ' in ' + companyName + '. Please login in ' + companyName + ' and check your order details.'
            historyMessages.push('Internal Buyer Changed: ' + user.fname + ' ' + user.lname)
          } else if (order.internal_buyer_id && !data.internal_buyer_id) {
            user = User.find(order.internal_buyer_id)
            message = 'You\'ve revoked from order ' + data.id + ' in ' + companyName + '. Please login in ' + companyName + ' and check your order details.'
            historyMessages.push('Internal Buyer Revoked: ' + user.fname + ' ' + user.lname)
          }

          if (historyMessages.length > 0) {
            historyMessages.forEach(historyMessage => {
              HistoryEntity.createOrderHistory(data.user, {
                order: data,
                message: historyMessage
              })
            })
          }

          if (user) {
            NotificationEntity.send('general_notification', {
              title: 'Assinged new order',
              name: user.fname + ' ' + user.lname,
              email: user.email,
              order_id: data.id,
              company_name: companyName,
              reply_to: 'no-reply@sailife.com',
              message: message
            })
          }
        }
      })

    this.update({
      id: data.id,
      user_id: data.user_id,
      manager_id: data.manager_id,
      buying_lead_id: data.buying_lead_id,
      internal_buyer_id: internalBuyerId,
      address_id: data.address_id,
      currency: data.currency,
      status: data.status,
      created_at: data.created_at,
      updated_at: data.updated_at
    })

    this.updateProductLines(data)

    let orders = this.all()
    Order.insert({data: orders})

    return Order.query().withAllRecursive().whereId(data.id).first()
  }
  updateProductLines (data) {
    let user = data.user
    let order = data

    data.products.forEach(product => {
      if (!product.lines) {
        OrderDetailsEntity.update(user, order, product)
      }
    })

    data.requests.forEach(request => {
      if (request.lines) {
        // let lines = RequestLine
        //   .query()
        //   .withAllRecursive()
        //   .where('product_id', request.id)
        //   .where('order_id', order.id)
        //   .get()
        //   .filter(line => {
        //     let isLine = false
        //     request.lines.forEach(requestLine => {
        //       if (requestLine.id === line.id) {
        //         isLine = true
        //       }
        //     })
        //     if (isLine) {
        //       return line
        //     }
        //   })
        // RequestLineEntity.store(lines)
        request.lines.forEach(requestLine => {
          RequestLineEntity.addOrUpdate(user, order, requestLine)
        })
      }
    })
  }
}

export default new OrderEntity()
