import moment from 'moment'

const mixin = {
  computed: {},
  methods: {
    format (date, format = 'YYYY-MM-DD HH:mm:ss') {
      return moment(date).format(format)
    },
    async setAdvancedOptions (orders = [], option = {}) {
      let {customers, managers, buyingLeads, internalBuyers} = await this.getFilterOptions(this.orders, option)
      this.customers = customers
      this.projectManagers = managers
      this.buyingLeads = buyingLeads
      this.internalBuyers = internalBuyers
    },
    async getFilterOptions (orders = [], options = {}) {
      if (this.user) {
        if (options.customer) {
          orders = orders.filter(order => {
            return order.user.id === options.customer ? order : null
          })
        }

        if (options.projectManager) {
          orders = orders.filter(order => {
            return order.manager_id === options.projectManager ? order : null
          })
        }

        if (options.buyingLead) {
          orders = orders.filter(order => {
            return order.buying_lead_id === options.buyingLead ? order : null
          })
        }

        if (options.internalBuyer) {
          orders = orders.filter(order => {
            return order.internal_buyer_id === options.internalBuyer ? order : null
          })
        }

        return this.prpareAdvancedOptions(orders)
      }
      return {
        addresses: [],
        customers: [],
        managers: [],
        buyingLeads: [],
        internalBuyers: []
      }
    },
    prpareAdvancedOptions (orders) {
      if (orders.length < 1) {
        return {
          addresses: [],
          customers: [],
          managers: [],
          buyingLeads: [],
          internalBuyers: []
        }
      }

      let addresses = []
      let customers = []
      let managers = []
      let buyingLeads = []
      let internalBuyers = []

      orders.forEach(order => {
        if (order.address) {
          addresses.push({
            value: order.address.id,
            text: order.address.line1
          })
        }
        if (order.user) {
          customers.push({
            value: order.user.id,
            text: order.user.fname + ' ' + order.user.lname
          })
        }
        if (order.manager) {
          managers.push({
            value: order.manager.id,
            text: order.manager.fname + ' ' + order.manager.lname
          })
        }
        if (order.buying_lead) {
          buyingLeads.push({
            value: order.buying_lead.id,
            text: order.buying_lead.fname + ' ' + order.buying_lead.lname
          })
        }
        if (order.internal_buyer) {
          internalBuyers.push({
            value: order.internal_buyer.id,
            text: order.internal_buyer.fname + ' ' + order.internal_buyer.lname
          })
        }
      })

      addresses = addresses.map(item => item['value'])
        .map((item, index, final) => final.indexOf(item) === index && index)
        .filter(item => addresses[item])
        .map(item => addresses[item])
      customers = customers.map(item => item['value'])
        .map((item, index, final) => final.indexOf(item) === index && index)
        .filter(item => customers[item])
        .map(item => customers[item])
      managers = managers.map(item => item['value'])
        .map((item, index, final) => final.indexOf(item) === index && index)
        .filter(item => managers[item])
        .map(item => managers[item])
      buyingLeads = buyingLeads.map(item => item['value'])
        .map((item, index, final) => final.indexOf(item) === index && index)
        .filter(item => buyingLeads[item])
        .map(item => buyingLeads[item])
      internalBuyers = internalBuyers.map(item => item['value'])
        .map((item, index, final) => final.indexOf(item) === index && index)
        .filter(item => internalBuyers[item])
        .map(item => internalBuyers[item])

      return {
        addresses,
        customers,
        managers,
        buyingLeads,
        internalBuyers
      }
    }
  }
}

export default mixin
