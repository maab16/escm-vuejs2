import user from '@/mixins/user'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  mixins: [user],
  computed: {
    ...mapGetters('request', {
      requestOrders: 'orders'
    })
  },
  watch: {
    address () {
      this.setAdvancedFilterOptions(this.orders, this.getOptions())
    },
    customer () {
      this.setAdvancedFilterOptions(this.orders, this.getOptions())
    },
    projectManager () {
      this.setAdvancedFilterOptions(this.orders, this.getOptions())
    },
    buyingLead () {
      this.setAdvancedFilterOptions(this.orders, this.getOptions())
    },
    internalBuyer () {
      this.setAdvancedFilterOptions(this.orders, this.getOptions())
    },
    filter () {
      this.isSearchLoading = true
      _.debounce(async () => {
        await this.setRequestOrders(this.getOptions())
        this.isSearchLoading = false
      }, process.env.DEBOUNCE_WAIT_RATE)()
    }
  },
  methods: {
    ...mapActions('request', [
      'setRequests'
    ]),
    /**
     * Retrive Order List API Data
     */
    async setRequestOrders (option) {
      this.isSearchLoading = true
      let result = await this.setRequests(option)
      this.isSearchLoading = false
      if (result) {
        // this.orders = this.requestOrders.map(orderDetail => {
        //   orderDetail.actions = {
        //     id: orderDetail.order_id
        //   }
        //   return orderDetail
        // })
        this.orders = this.requestOrders
        this.totalRows = this.orders.length
        this.setAdvancedFilterOptions(this.orders, option)
      }
    },
    async setAdvancedFilterOptions (requests = [], options = {}) {
      if (this.user) {
        if (options.customer) {
          requests = requests.filter(request => {
            return request.order.user.id === options.customer ? request : null
          })
        }

        if (options.projectManager) {
          requests = requests.filter(request => {
            return request.order.manager_id === options.projectManager ? request : null
          })
        }

        if (options.buyingLead) {
          requests = requests.filter(request => {
            return request.order.buying_lead_id === options.buyingLead ? request : null
          })
        }

        if (options.internalBuyer) {
          requests = requests.filter(request => {
            return request.order.internal_buyer_id === options.internalBuyer ? request : null
          })
        }

        this.addresses = []
        this.customers = []
        this.managers = []
        this.buyingLeads = []
        this.internalBuyers = []

        requests.forEach(request => {
          if (request.order.address) {
            this.addresses.push({
              value: request.order.address.id,
              text: request.order.address.line1
            })
          }
          if (request.order.user) {
            this.customers.push({
              value: request.order.user.id,
              text: request.order.user.fname + ' ' + request.order.user.lname
            })
          }
          if (request.order.manager) {
            this.managers.push({
              value: request.order.manager.id,
              text: request.order.manager.fname + ' ' + request.order.manager.lname
            })
          }
          if (request.order.buying_lead) {
            this.buyingLeads.push({
              value: request.order.buying_lead.id,
              text: request.order.buying_lead.fname + ' ' + request.order.buying_lead.lname
            })
          }
          if (request.order.internal_buyer) {
            this.internalBuyers.push({
              value: request.order.internal_buyer.id,
              text: request.order.internal_buyer.fname + ' ' + request.order.internal_buyer.lname
            })
          }
        })

        this.addresses = this.addresses.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => this.addresses[item])
          .map(item => this.addresses[item])
        this.customers = this.customers.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => this.customers[item])
          .map(item => this.customers[item])
        this.projectManagers = this.managers.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => this.managers[item])
          .map(item => this.managers[item])
        this.buyingLeads = this.buyingLeads.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => this.buyingLeads[item])
          .map(item => this.buyingLeads[item])
        this.internalBuyers = this.internalBuyers.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => this.internalBuyers[item])
          .map(item => this.internalBuyers[item])
      }
    }
  }
}
