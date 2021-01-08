import analyticMixin from '@/mixins/analytic'

export default {
  middleware: ['auth', 'analytic'],
  mixins: [analyticMixin],
  mounted () {
    this.fetchInternalBuyerOrders()
    // Set the initial number of orders
    this.totalRows = this.orders.length
  },
  methods: {
    fetchInternalBuyerOrders (option = {}) {
      this.setAdvancedOptions(this.orders, option)
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
      this.fetchInternalBuyerOrders()
      this.$nextTick(() => {})
    },
    /**
     *filter Submit
     */
    onSubmit (evt) {
      evt.preventDefault()
      this.fetchInternalBuyerOrders(this.getAdvancedFormOptions())
      // this.filterSection = false
    }
  }
}
