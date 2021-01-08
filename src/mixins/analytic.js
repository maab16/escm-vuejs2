import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import user from '@/mixins/user'
import fields from '@/mixins/table-fields'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [user, fields],
  middleware: 'auth',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      customer: null,
      projectManager: null,
      buyingLead: null,
      internalBuyer: null,
      from: '',
      to: '',
      customers: [],
      projectManagers: [],
      internalBuyers: [],
      buyingLeads: [],
      showDecadeNav: false,
      hideHeader: true,
      filterSection: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [10, 25, 50],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      bgInfo: true,
      bgSuccess: false,
      bgprimary: false,
      countlist: [],
      orders: [],
      isLoading: false
    }
  },
  /**
   *click awy directives
    */
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    ...mapGetters('analytic', [
      'analyticOrders',
      'popularProducts',
      'getOrdersByMonth',
      'getCompanyDistributionData',
      'getUnavailableProductsByMonth',
      'getInternalBuyerOrdersByMonth',
      'getUnavailableProducts',
      'getBuyerCompanyData',
      'customerOrders',
      'successfulOrders',
      'slsOrders',
      'completedOrders',
      'pendingOrders'
    ]),
    statusConnt () {
      return this.count(this.orders)
    },
    rows () {
      return this.orders.length
    },
    sortOptions () {
      // Create an options list from our fields
      return this.fielast_namelds
        .filter(f => f.sortable)
        .map(f => {
          return {
            text: f.label,
            value: f.key
          }
        })
    }
  },
  watch: {
    customer () {
      this.setAdvancedOptions(this.orders, this.getAdvancedFormOptions())
    },
    projectManager () {
      this.setAdvancedOptions(this.orders, this.getAdvancedFormOptions())
    },
    buyingLead () {
      this.setAdvancedOptions(this.orders, this.getAdvancedFormOptions())
    },
    internalBuyer () {
      this.setAdvancedOptions(this.orders, this.getAdvancedFormOptions())
    }
  },
  methods: {
    ...mapActions('analytic', [
      'setAnalyticOrders',
      'setPopularProducts',
      'setOrdersByMonth',
      'setCompanyDistributionData',
      'setUnavailableOrdersByMonth',
      'setInternalBuyerOrdersByMonth',
      'setCompanyDataByBuyer',
      'setUnavailableProducts',
      'setOrdersByStatus',
      'setSuccessfulOrders',
      'setSlsOrders',
      'setCompletedOrders',
      'setPendingOrders'
    ]),
    async fetchOrders (option = {}) {
      this.isLoading = true
      let status = this.type
      await this.setOrdersByStatus({status, option})
      switch (status) {
        case 'successful':
          this.orders = this.successfulOrders
          break
        case 'sls':
          this.orders = this.slsOrders
          break
        case 'completed':
          this.orders = this.completedOrders
          break
        case 'pending':
          this.orders = this.pendingOrders
          break
      }

      this.setAdvancedOptions(this.orders, option)
      this.isLoading = false
    },
    /**
     * filter Reset
     */
    async onReset (evt) {
      evt.preventDefault()
      this.isLoading = true
      this.customer = null
      this.projectManager = null
      this.buyingLead = null
      this.internalBuyer = null
      this.from = null
      this.to = null
      this.setAdvancedOptions(this.orders, {})
      await this.fetchOrders()
      this.$nextTick(() => {
        this.isLoading = false
      })
    },
    /**
     *click away method
     */
    sortfilter () {
      this.filterSection = false
    },
    count (array) {
      let counts = array.reduce((out, {
        status
      }) => ({
        ...out,
        [status]: out[status] + 1 || 1
      }), {})
      return Object.keys(counts).map(key => ({
        status: key,
        count: counts[key]
      }))
    },
    /**
     *click away filtersearch
     */
    filterSearch () {
      this.filterSection = !this.filterSection
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    /**
     *filter Submit
     */
    onSubmit (evt) {
      evt.preventDefault()
      this.fetchOrders(this.getAdvancedFormOptions())
      // console.log(JSON.stringify(this.form))
      // this.filterSection = false
    },
    getAdvancedFormOptions () {
      return {
        'customer': this.customer,
        'projectManager': this.projectManager,
        'buyingLead': this.buyingLead,
        'internalBuyer': this.internalBuyer,
        'from': this.from,
        'to': this.to
      }
    }
  }
}
