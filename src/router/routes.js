import home from '@/app/components/pages/home/home.vue'
import order from '@/app/components/pages/order/order.vue'
import login from '@/app/components/auth/login/login.vue'
import notfound from '@/app/components/common/notfound/notfound.vue'
import searchResult from '@/app/components/pages/home/search-item/searchItem.vue'
import recentUpdates from '@/app/components/pages/home/recent-updatesdetail/recentUpdatesdetails.vue'
import cartList from '@/app/components/pages/cart/cart.vue'
// import reload from '@/app/components/pages/cart/reload.vue'
import checkout from '@/app/components/pages/cart/checkout-cart/checkout.vue'
import orderList from '@/app/components/pages/order/order-list/orderList.vue'
import orderDetail from '@/app/components/pages/order/order-details/orderDetail.vue'
import requestProduct from '@/app/components/pages/request-product/requestProduct.vue'
import analyticsReport from '@/app/components/pages/analytics-report/analyticsReport.vue'
import analyticsList from '@/app/components/pages/analytics-report/analytics-list/analyticsList.vue'
import analyticsDetails from '@/app/components/pages/analytics-report/analytics-details/analyticsDetails.vue'
import successfulOrders from '@/app/components/pages/analytics-report/successful-orders/successfulOrders.vue'
import placedSLSOrders from '@/app/components/pages/analytics-report/placed-sls-orders/placedSLSOrders.vue'
import completedOrders from '@/app/components/pages/analytics-report/completed-orders/completedOrders.vue'
import internalBuyerOrders from '@/app/components/pages/analytics-report/internal-buyer-orders/internalBuyerOrders.vue'
import unavailableProducts from '@/app/components/pages/analytics-report/unavailable-products/unavailableProducts.vue'
// import comment from '@/app/components/pages/order/comment/comment.vue'
import contact from '@/app/components/pages/contact/contact.vue'
import contactList from '@/app/components/pages/contact/contact-list/contactList.vue'
import contactDetail from '@/app/components/pages/contact/contact-details/contactDetail.vue'
import faq from '../app/components/pages/faq/faq.vue'
import store from '../store'

function checkPermission (to, from, next) {
  if (to.meta.permission) {
    if (store.getters['user/can'](to.meta.permission)) {
      return next()
    }

    return next(to.meta.redirect ? to.meta.redirect : '/home')
  }

  return next()
}

const routes = [{
  path: '/',
  name: 'login',
  component: login
},
{
  path: '/home',
  component: home,
  name: 'home',
  props: true,
  children: [
    { path: '', component: searchResult },
    {
      path: 'updates',
      component: recentUpdates,
      beforeEnter: checkPermission,
      meta: {
        permission: 'history.list',
        redirect: '/home'
      }
    }
  ]
},
{
  path: '/order',
  component: order,
  children: [
    {
      path: '',
      component: orderList,
      beforeEnter: checkPermission,
      meta: {
        permission: 'order.list'
      }
    },
    {
      path: 'order-detail/:id',
      component: orderDetail,
      name: 'order-detail',
      props: true,
      beforeEnter: checkPermission,
      meta: {
        permission: 'order.view',
        redirect: '/order'
      }
    }
    // {
    //   path: 'comment',
    //   component: comment,
    //   beforeEnter: checkPermission,
    //   meta: {
    //     permission: 'comment.list'
    //   }
    // }
  ]
},
{
  path: '/request-product',
  name: 'RequestProduct',
  component: requestProduct,
  beforeEnter: checkPermission,
  meta: {
    permission: 'request.list'
  }
},
{
  path: '/analytics',
  name: 'analytics',
  component: analyticsReport,
  children: [
    {
      path: '',
      component: analyticsList,
      beforeEnter: checkPermission,
      meta: {
        requiresAuth: true,
        permission: 'analytics.list'
      }
    },
    {
      path: 'analtics-detail',
      component: analyticsDetails,
      beforeEnter: checkPermission,
      meta: {
        requiresAuth: true,
        permission: 'analytics.view'
      }
    },
    {
      path: 'successful-orders',
      component: successfulOrders,
      beforeEnter: checkPermission,
      meta: {
        requiresAuth: true,
        permission: 'analytics.view'
      }
    },
    {
      path: 'placed-sls-orders',
      component: placedSLSOrders,
      beforeEnter: checkPermission,
      meta: {
        requiresAuth: true,
        permission: 'analytics.view'
      }
    },
    {
      path: 'completed-orders',
      component: completedOrders,
      beforeEnter: checkPermission,
      meta: {
        requiresAuth: true,
        permission: 'analytics.view'
      }
    },
    {
      path: 'internal-buyer-orders',
      component: internalBuyerOrders,
      beforeEnter: checkPermission,
      meta: {
        requiresAuth: true,
        permission: 'analytics.view'
      }
    },
    {
      path: 'unavailable-products',
      component: unavailableProducts,
      beforeEnter: checkPermission,
      meta: {
        requiresAuth: true,
        permission: 'analytics.view'
      }
    }
  ]
},
{
  path: '/cart',
  name: 'cart',
  component: cartList,
  beforeEnter: checkPermission,
  meta: {
    requiresAuth: true,
    permission: 'cart.list'
  }
},
// {
//   path: '/reload/:name',
//   name: 'reload',
//   component: reload,
//   meta: { requiresAuth: true }
// },
{
  path: '/checkout',
  name: 'checkout',
  component: checkout,
  props: true,
  beforeEnter: checkPermission,
  meta: {
    requiresAuth: true,
    permission: 'order.create',
    redirect: '/cart'
  }
},
{
  path: '/contact',
  component: contact,
  name: 'contact',
  beforeEnter: checkPermission,
  meta: {
    requiresAuth: true,
    permission: 'contact.create'
  }
},
{
  path: '/contact/list',
  component: contactList,
  name: 'contact-list',
  beforeEnter: checkPermission,
  meta: {
    requiresAuth: true,
    permission: 'contact.list'
  }
},
{
  path: '/contact/:id',
  component: contactDetail,
  name: 'contact-detail',
  props: true,
  beforeEnter: checkPermission,
  meta: {
    requiresAuth: true,
    permission: 'contact.view',
    redirect: '/contact/list'
  }
},
{
  path: '/faq',
  component: faq,
  name: 'faq',
  beforeEnter: checkPermission,
  meta: {
    requiresAuth: true,
    permission: 'faq.list'
  }
},
{
  path: '*',
  component: notfound
}
]

export default routes
