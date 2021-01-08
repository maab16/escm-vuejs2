import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import requestFields from '@/mixins/request-fields'
import requestMixin from '@/mixins/request-details'
import Spinner from '@/app/Spinner.vue'

export default {
  middleware: ['auth', 'internal'],
  mixins: [requestFields, requestMixin],
  components: {
    ValidationObserver,
    ValidationProvider,
    Spinner
  },
  data () {
    return {
      address: null,
      customer: null,
      projectManager: null,
      buyingLead: null,
      internalBuyer: null,
      from: '',
      to: '',
      addresses: [],
      customers: [],
      projectManagers: [],
      internalBuyers: [],
      buyingLeads: [],
      showDecadeNav: false,
      hideHeader: true,
      filterSection: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
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
      type: 'sls',
      fields: [{
        key: 'cas',
        label: 'CAS No.',
        sortable: true
      },
      {
        key: 'description',
        label: 'Product Name',
        sortable: true
      },
      {
        key: 'qty',
        label: 'Quantity',
        sortable: true
      },
      {
        key: 'customer',
        label: 'Customer',
        sortable: true
      },
      {
        key: 'user',
        label: 'Requested By',
        sortable: true
      },
      {
        key: 'buying_lead',
        label: 'Buying Lead',
        sortable: true
      },
      {
        key: 'manager',
        label: 'Project Manager',
        sortable: true
      },
      {
        key: 'internal_buyer',
        label: 'Internal Buyer',
        sortable: true
      },
      {
        key: 'order_id',
        label: 'Related Order ID.',
        sortable: true
      },
      {
        key: 'delivery_at',
        label: 'Delivery Date',
        sortable: true
      },
      {
        key: 'created_at',
        label: 'Order Date',
        sortable: true
      },
      {
        key: 'actions',
        label: 'Actions',
        sortable: false
      }
      ],
      isLoading: false,
      isSearchLoading: false
    }
  },
  /**
   *click awy directives
   */
  directives: {
    onClickaway: onClickaway
  },
  async mounted () {
    this.isLoading = true
    await this.setRequestOrders(this.getOptions())
    this.isLoading = false
    // Set the initial number of orders
    // console.log(this.orders)
  },
  computed: {
    statusConnt () {
      return this.count(this.order)
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
  methods: {
    getBuyingLead (order) {
      console.log(order)
      return 'hello'
    },
    /**
     *click away method
     */
    sortfilter () {
      this.filterSection = false
    },
    /**
     *click away filtersearch
     */
    filterSearch () {
      console.log('filter search')
      this.filterSection = !this.filterSection
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
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    /**
     * filter Reset
     */
    onReset (evt) {
      evt.preventDefault()
      this.address = null
      this.customer = null
      this.projectManager = null
      this.buyingLead = null
      this.internalBuyer = null
      this.from = ''
      this.to = ''
      this.filter = ''
      this.setRequestOrders(this.getOptions())
      this.$nextTick(() => {})
    },
    getOptions () {
      return {
        'filter': this.filter,
        'address': this.address,
        'customer': this.customer,
        'projectManager': this.projectManager,
        'buyingLead': this.buyingLead,
        'internalBuyer': this.internalBuyer,
        'from': this.from,
        'to': this.to
      }
    },
    /**
     *filter Submit
     */
    onSubmit (evt) {
      evt.preventDefault()
      this.setRequestOrders(this.getOptions())
      // this.filterOrderlist()
      console.log(JSON.stringify(this.form))
      // this.filterSection = false
    }
  }
}
