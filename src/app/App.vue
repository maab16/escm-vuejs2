<template>
  <div id='app'>
    <!-- <div class="spinner">
      <spinner></spinner>
    </div> -->
    <!-- <spinner></spinner> -->
    <div id='nav'>
      <app-header v-if="this.$route.path !== '/'"></app-header>
    </div>
    <router-view />
  </div>
</template>

<style lang='scss'>
.spinner {
  display: none;
}
.loader .spinner {
  display: block;
}
@import './src/style.scss';
</style>
<script>
import Header from './components/common/header/header.vue'
import users from '@/data/users'
import addresses from '@/data/addresses'
import userAddresses from '@/data/user-addresses'
import roles from '@/data/roles'
import buyerLead from '@/data/buyer-lead'
import roleUser from '@/data/role-user'
import organizations from '@/data/organizations'
import products from '@/data/products'
import orders from '@/data/orders'
import orderDetails from '@/data/orders-details'
import requestDetails from '@/data/request-details'
import histories from '@/data/histories'
import comments from '@/data/comments'
import recentUpdates from '@/data/recent-updates'
import notifications from '@/data/notifications'
import faqs from '@/data/faqs'
import User from '@/Modules/User/user.model'
import Address from '@/Modules/Address/address.model'
import UserAddress from '@/Modules/User/user-address.model'
import BuyerLead from '@/Modules/Role/buyer-lead.model'
import Role from '@/Modules/Role/role.model'
import RoleUser from '@/Modules/RoleUser/role-user.model'
import Organization from '@/Modules/Organization/organization.model'
// import Product from '@/Modules/Product/product.model'
import Cart from '@/Modules/Cart/cart.model'
import Order from '@/Modules/Order/order.model'
import OrderDetails from '@/Modules/OrderDetails/order-details.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'
import History from '@/Modules/History/history.model'
import Comment from '@/Modules/Comment/comment.model'
import RecentUpdate from '@/Modules/RecentUpdates/recent.model'
import Notification from '@/Modules/Notification/notification.model'
import Faq from '@/Modules/Faq/faq.model'
import Spinner from './Spinner.vue'
// import moment from 'moment'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    Spinner
  },
  created () {
    // console.log(new Date())
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
    // localStorage.clear()
    // console.log(users);
    // this.$store.dispatch('entities/deleteAll')
    // localStorage.setItem('users', null);
    // localStorage.setItem('roles', null);
    // localStorage.setItem('roleUser', null);
    // localStorage.setItem('organizations', null);

    if (localStorage.getItem('users') == null) {
      localStorage.setItem('users', JSON.stringify(users))
    }
    if (localStorage.getItem('addresses') == null) {
      localStorage.setItem('addresses', JSON.stringify(addresses))
    }
    if (localStorage.getItem('user_addresses') == null) {
      localStorage.setItem('user_addresses', JSON.stringify(userAddresses))
    }
    if (localStorage.getItem('roles') == null) {
      localStorage.setItem('roles', JSON.stringify(roles))
    }
    if (localStorage.getItem('buyer_lead') == null) {
      localStorage.setItem('buyer_lead', JSON.stringify(buyerLead))
    }
    if (localStorage.getItem('role_user') == null) {
      localStorage.setItem('role_user', JSON.stringify(roleUser))
    }
    if (localStorage.getItem('organizations') == null) {
      localStorage.setItem('organizations', JSON.stringify(organizations))
    }
    // if (localStorage.getItem('products') == null) {
    //   localStorage.setItem('products', JSON.stringify(products))
    // }
    if (localStorage.getItem('orders') == null) {
      localStorage.setItem('orders', JSON.stringify(orders))
    }
    if (localStorage.getItem('orderDetails') == null) {
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails))
    }
    if (localStorage.getItem('requestDetails') == null) {
      localStorage.setItem('requestDetails', JSON.stringify(requestDetails))
    }
    if (localStorage.getItem('histories') == null) {
      localStorage.setItem('histories', JSON.stringify(histories))
    }
    if (localStorage.getItem('comments') == null) {
      localStorage.setItem('comments', JSON.stringify(comments))
    }
    if (localStorage.getItem('recentUpdates') == null) {
      localStorage.setItem('recentUpdates', JSON.stringify(recentUpdates))
    }
    if (localStorage.getItem('notifications') == null) {
      localStorage.setItem('notifications', JSON.stringify(notifications))
    }
    if (localStorage.getItem('faqs') == null) {
      localStorage.setItem('faqs', JSON.stringify(faqs))
    }

    let carts = localStorage.getItem('carts') != null
      ? JSON.parse(localStorage.getItem('carts'))
      : []

    User.insert({data: JSON.parse(localStorage.getItem('users'))})
    Address.insert({data: JSON.parse(localStorage.getItem('addresses'))})

    UserAddress.insert({data: JSON.parse(localStorage.getItem('user_addresses'))})

    Role.insert({data: JSON.parse(localStorage.getItem('roles'))})

    BuyerLead.insert({data: JSON.parse(localStorage.getItem('buyer_lead'))})

    RoleUser.insert({data: JSON.parse(localStorage.getItem('role_user'))})

    Organization.insert({data: JSON.parse(localStorage.getItem('organizations'))})

    // Product.insert({data: JSON.parse(localStorage.getItem('products'))})
    this.$store.dispatch('product/setProducts', products)

    Order.insert({data: JSON.parse(localStorage.getItem('orders'))})

    OrderDetails.insert({data: JSON.parse(localStorage.getItem('orderDetails'))})

    RequestDetails.insert({data: JSON.parse(localStorage.getItem('requestDetails'))})

    History.insert({data: JSON.parse(localStorage.getItem('histories'))})

    Comment.insert({data: JSON.parse(localStorage.getItem('comments'))})

    RecentUpdate.insert({data: JSON.parse(localStorage.getItem('recentUpdates'))})

    Notification.insert({data: JSON.parse(localStorage.getItem('notifications'))})

    Faq.insert({data: JSON.parse(localStorage.getItem('faqs'))})

    Cart.insert({data: carts})
  },

  mounted () {
    // console.log(BuyerLead.all())
    // console.log(localStorage.getItem('orders'))
    // console.log(Order.query().withAllRecursive().get())
    // console.log(RequestDetails.all())
    // console.log(RecentUpdate.query().withAll().get())
    // console.log(UserAddress.all())
    // console.log(User.query().withAllRecursive().get())
    // console.log(User.query().with('roles').where('email', 'admin@escm.com').first())
    // console.log(Role.query().with('users').where('slug', 'admin').first())
    // console.log(this.$store.getters['todo/getTotalTodos'])
  }
}
</script>
