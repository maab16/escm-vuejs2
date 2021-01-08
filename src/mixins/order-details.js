
import userMixin from '@/mixins/user'
import {mapActions, mapGetters} from 'vuex'

export default {
  mixins: [userMixin],
  computed: {
    ...mapGetters('role', [
      'roles'
    ]),
    ...mapGetters('order', [
      'order',
      'buyers',
      'managers',
      'leads'
    ]),
    ...mapGetters('product', [
      'currency'
    ])
  },
  methods: {
    ...mapActions('role', [
      'fetchRoles'
    ]),
    ...mapActions('order', [
      'fetchOrderDetails',
      'setProductLines',
      'updateOrder',
      'setProjectManagers',
      'setBuyingLeads',
      'setInternalBuyers'
    ]),
    ...mapActions('history', [
      'addOrderHistory'
    ]),
    ...mapActions('comment', [
      'saveComment'
    ]),
    async retrieveOrderList () {
      await this.fetchRoles()
      await this.fetchOrderDetails(this.id)

      if (this.order.buying_lead_id) {
        await this.setInternalBuyers(this.order.buying_lead_id)
        this.internalBuyers = []
        console.log(this.buyers)
        this.buyers.map(buyer => {
          this.internalBuyers.push({
            value: buyer.id,
            text: buyer.fname + ' ' + buyer.lname
          })
        })
      }
      this.roles.forEach(role => {
        if (role.name === 'ProjectManager_Security_Default') {
          this.projectManagers = []
          role.users.map(user => {
            this.projectManagers.push({
              value: user.id,
              text: user.fname + ' ' + user.lname
            })
          })
        } else if (role.name === 'BuyingLead_Security_Default') {
          this.buyingLeads = []
          role.users.map(user => {
            this.buyingLeads.push({
              value: user.id,
              text: user.fname + ' ' + user.lname
            })
          })
        }
      })
    },
    async changeOrderDetails (order, type, modal) {
      await this.updateOrder(order)
      this.retrieveOrderList()
      this.checkAccess()
      this.$refs[modal].hide()
    },
    async updateStatus () {
      switch (this.selected) {
        case 'Placed with SLS':
          this.order.status = 'sls'
          break
        case 'Completed':
          this.order.status = 'completed'
          break
      }
      await this.updateOrder(this.order)
      this.retrieveOrderList()
      this.$refs['update-order-status-modal'].hide()
    },
    async updateDetails () {
      let isDirty = false
      this.RequestList = this.RequestList.map(item => {
        let count = 0
        item.invalidQty = false
        if (item.lines) {
          item.lines.forEach(line => {
            count += parseInt(line.qty)
          })
          if (count > item.qty) {
            isDirty = true
            item.invalidQty = true
          }
        }
        return item
      })

      if (!isDirty) {
        console.log(this.RequestList)
        console.log(this.order)
        await this.setProductLines(this.order)
        await this.fetchOrderDetails(this.$route.params.id)
        this.$refs['cart-update-modal'].hide()
      }
    },
    async comment () {
      if (this.message.length < 1) {
        return
      }
      await this.saveComment({
        order_id: this.order.id,
        message: this.message
      })
      this.message = ''
      await this.fetchOrderDetails(this.$route.params.id)
    },
    /**
     * submit add pr number
     **/
    async submitProduct () {
      // const data = {
      //   RequestList: this.RequestList
      // }
      // await this.updateOrder()
    },
    checkAccess () {
      if (!this.order) {
        this.$router.push('/order')
      }
      if (
        !this.hasPermission('order.view') &&
        // !this.isAdmin &&
        // !this.isSupplierManager &&
        this.user.id !== this.order.user_id &&
        this.user.id !== this.order.buying_lead_id &&
        this.user.id !== this.order.internal_buyer_id &&
        this.user.id !== this.order.manager_id
      ) {
        this.$router.push('/order')
      }
    }
  }
}
