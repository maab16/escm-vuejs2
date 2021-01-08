import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import orderMixin from '@/mixins/order'
import orderFields from '@/mixins/table-fields'
import Spinner from '@/app/Spinner.vue'
import _ from 'lodash'

export default {
  middleware: 'auth',
  mixins: [orderMixin, orderFields],
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
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      orderFilterKey: 'all',
      countlist: [],
      customer_fields: [
        {
          key: 'order_number', // Changes by Venkat
          label: 'Order No.',
          sortable: true
        },
        {
          key: 'address',
          label: 'Delivery Location',
          sortable: true
        },
        {
          key: 'updated_at',
          label: 'Order Date',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'meta',
          label: ''
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      ordersList: [],
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
  computed: {
    /**
     * tabs changes data list
     */
    orderFilter () {
      return this[this.orderFilterKey]
    },
    all () {
      this.ordersList = this.orders.map(order => {
        order.meta = {
          id: order.id
        }
        return order
      })
      return this.ordersList
    },
    success () {
      this.ordersList = this.orders.map(order => {
        if (order.status === 'successful') {
          order.meta = {
            id: order.id
          }
          return order
        }
        return null
      })
      this.ordersList = this.ordersList.filter(order => order)
      return this.orders.filter(order => order.status === 'successful')
    },
    complete () {
      this.ordersList = this.orders.map(order => {
        if (order.status === 'completed') {
          order.meta = {
            id: order.id
          }
          return order
        }
      })
      this.ordersList = this.ordersList.filter(order => order)
      return this.orders.filter(order => order.status === 'completed')
    },
    sls () {
      this.ordersList = this.orders.map(order => {
        if (order.status === 'sls') {
          order.meta = {
            id: order.id
          }
          return order
        }
      })
      this.ordersList = this.ordersList.filter(order => order)
      return this.orders.filter(order => order.status === 'sls')
    },
    /**
     * tabs count list
     */
    filteredArray () {
      const ret = {}
      this.listData = this.ordersList.forEach(element => {
        const dataStatus = element.status
        ret[dataStatus] = {
          status: dataStatus,
          count: ret[dataStatus] && ret[dataStatus].count
            ? ret[dataStatus].count + 1 : 1
        }
      })
      const statusData = Object.values(ret)
      return statusData
    }
  },
  watch: {
    address () {
      this.setAdvancedOptions(this.orders, this.getOptions())
    },
    customer () {
      this.setAdvancedOptions(this.orders, this.getOptions())
    },
    projectManager () {
      this.setAdvancedOptions(this.orders, this.getOptions())
    },
    buyingLead () {
      this.setAdvancedOptions(this.orders, this.getOptions())
    },
    internalBuyer () {
      this.setAdvancedOptions(this.orders, this.getOptions())
    },
    filter () {
      this.isSearchLoading = true
      _.debounce(async () => {
        await this.fetchOrderList(this.getOptions())
        this.isSearchLoading = false
      }, process.env.DEBOUNCE_WAIT_RATE)()
    }
  },
  async mounted () {
    this.isLoading = true
    await this.fetchOrderList(this.getOptions())
    this.isLoading = false
    if (!this.isCustomerUser) {
      this.fields = this.fields.filter(field => field.key !== 'address')
    }
    if (this.isBuyingLead) {
      this.fields = this.fields.filter(field => field.key !== 'buying_lead')
    }
    if (this.isManager) {
      this.fields = this.fields.filter(field => field.key !== 'manager')
    }
  },
  methods: {
    orderDate (date) {
      return date
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
      this.filterSection = !this.filterSection
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    /**
     * filter Reset
     */
    async onReset (evt) {
      evt.preventDefault()
      this.address = null
      this.customer = null
      this.projectManager = null
      this.buyingLead = null
      this.internalBuyer = null
      this.from = null
      this.to = null
      this.filter = ''
      this.isSearchLoading = true
      this.setAdvancedOptions(this.orders, {})
      await this.fetchOrderList(this.getOptions())
      this.isSearchLoading = false
      this.$nextTick(() => {})
    },
    /**
     *filter Submit
     */
    async onSubmit (evt) {
      evt.preventDefault()
      this.isSearchLoading = true
      await this.setOrders(this.getOptions())
      this.isSearchLoading = false
      this.ordersList = this.orders.map(order => {
        order.meta = {
          id: order.id
        }
        return order
      })
      this.filterSection = false
    },
    orderDetail (res) {
      this.$router.push({name: 'order-detail', params: { id: res }})
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
    }
  }
}
