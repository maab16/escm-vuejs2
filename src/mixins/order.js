import user from '@/mixins/user'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [user],
  computed: {
    ...mapGetters('order', [
      'orders',
      'order',
      'recentOrders',
      'successfulOrders',
      'completedOrders',
      'slsOrders',
      'getMaxOrderId',
      'getMaxOrderDetailsId'
    ])
  },
  methods: {
    ...mapActions('order', [
      'setOrders',
      'makeOrder',
      'fetchOrderDetails',
      'setRecentOrders',
      'updateOrderDeatils',
      'updateOrder'
    ]),
    /**
     * Retrive Order List API Data
     */
    async fetchOrderList (form) {
      await this.setOrders(form)
      this.setAdvancedFilterOptions()
    },
    async setAdvancedFilterOptions () {
      if (this.user) {
        let {addresses, customers, managers, buyingLeads, internalBuyers} = await this.getFilterOptions(this.orders)
        this.addresses = addresses
        this.customers = customers
        this.projectManagers = managers
        this.buyingLeads = buyingLeads
        this.internalBuyers = internalBuyers
        this.ordersList = this.orders.map(order => {
          order.meta = {
            id: order.id
          }
          return order
        })
      }
    }
  }
}
