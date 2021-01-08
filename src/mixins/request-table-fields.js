import analytic from '@/mixins/analytic'
import fields from '@/mixins/request-fields'
import Spinner from '@/app/Spinner.vue'

export default {
  mixins: [analytic, fields],
  components: {
    Spinner
  },
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    this.fetchRequests()
    if (this.isBuyingLead) {
      this.fields = this.fields.filter(field => field.key !== 'buying_lead')
    }
    if (this.isManager) {
      this.fields = this.fields.filter(field => field.key !== 'manager')
    }
    // Set the initial number of orders
    this.totalRows = this.orders.length
  },
  methods: {
    async fetchRequests (option = {}) {
      this.isLoading = true
      await this.fetchOrders(option)
      switch (this.type) {
        case 'completed':
          this.orders = this.completedOrders
          break
        case 'sls':
          this.orders = this.slsOrders
          break
        case 'pending':
          this.orders = this.pendingOrders
          break
      }
      this.orders = this.orders.map(request => {
        request.customer = request.order.user.organization
        request.buying_lead_id = request.order.buying_lead_id
        request.manager_id = request.order.manager_id
        request.internal_buyer_id = request.order.internal_buyer_id
        request.manager = request.order.manager
        request.buying_lead = request.order.buying_lead
        request.internal_buyer = request.order.internal_buyer
        return request
      })
      this.setAdvancedOptions(this.orders, option)
      this.isLoading = false
    },
    /**
     * filter Reset
     */
    onReset (evt) {
      evt.preventDefault()
      this.customer = null
      this.projectManager = null
      this.buyingLead = null
      this.internalBuyer = null
      this.from = null
      this.to = null
      this.setAdvancedOptions(this.orders, {})
      this.fetchRequests()
      this.$nextTick(() => {})
    },
    /**
     *filter Submit
     */
    onSubmit (evt) {
      evt.preventDefault()
      this.fetchRequests(this.getAdvancedFormOptions())
      // this.filterSection = false
    }
  }
}
