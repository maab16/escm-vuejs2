import orderDetails from '@/mixins/order-details'

export default {
  middleware: 'auth',
  mixins: [orderDetails],
  props: ['id'],
  components: {},
  data () {
    return {
      hideCard: true,
      selected: 'Placed with SLS',
      statusProject: 'Placed with SLS',
      options: [{
        text: 'Placed with SLS',
        value: 'Placed with SLS'
      },
      {
        text: 'Completed',
        value: 'Completed'
      }
      ],
      ordernum: this.$route.params.id,
      ordersList: [],
      orderFields: [{
        key: 'id',
        label: 'S.No'
      },
      {
        key: 'products',
        label: 'Product Setails'
      },
      {
        key: 'Quality',
        label: 'Quantity'
      },
      {
        key: 'Supplier',
        label: 'Supplier'
      },
      {
        key: 'Unitprice',
        label: 'Unit Price'
      },
      {
        key: 'Subtotal',
        label: 'Sub Total'
      },
      {
        key: 'status',
        label: 'Status'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      // Changes By Venkat
      orderDetails: null,

      RequestList: [],
      projectManagers: [],
      buyingLeads: [],
      internalBuyers: [],
      updateorderDetail: false,
      recentDelted: false,
      products: [],
      requests: [],
      selectcheck: [],
      ordercheck: false,
      message: '',
      slNo: 1
    }
  },
  computed: {
    total: function () {
      let amount = 0
      this.order.products.forEach(product => {
        amount += product[this.currency] * product.pivot.qty
      })
      return amount
    }
  },
  async mounted () {
    await this.retrieveOrderList()
    console.log(this.order)
    // this.RequestList = this.order.products
    this.ordersList = this.order.products
    this.requests = this.order.requests.map(request => {
      request.isSelect = true
      request.slNo = this.slNo
      this.slNo++
      return request
    })
    this.products = this.order.products.map(product => {
      product.isSelect = true
      product.slNo = this.slNo
      this.slNo++
      return product
    })

    this.checkAccess()

    // this.selectcheck = this.products + this.requests
  },
  created () {},
  methods: {
    getTotal (currency) {
      let total = 0

      this.order.products.map(product => {
        total += product[currency] * product.pivot.qty
      })

      this.order.requests.map(request => {
        total += request[currency] * request.qty
      })

      return total.toFixed(2)
    },
    showProjectManagerModal () {
      this.$refs['project-manager-modal'].show()
    },
    showUpdateModal (item) {
      this.RequestList = []
      this.RequestList.push(item)
      this.$refs['cart-update-modal'].show()
    },
    showAllUpdateModal () {
      this.RequestList = this.selectcheck
      console.log(this.RequestList)
      this.$refs['cart-update-modal'].show()
    },
    /**
     * order All select
     */
    checkAll () {
      this.ordercheck = !this.ordercheck
      this.selectcheck = []
      if (this.ordercheck) { // Check all
        for (var data in this.products) {
          this.selectcheck.push(this.products[data])
        }
        for (var request in this.requests) {
          this.selectcheck.push(this.requests[request])
        }
        this.recentDelted = true
      } else {
        this.recentDelted = false
      }
    },
    /**
     * order single select
     */
    updateCheckall () {
      if (this.selectcheck.length === (this.products.length + this.requests.length)) {
        this.ordercheck = true
      } else {
        this.ordercheck = false
        this.recentDelted = true
      }
    },
    updateInr (item) {
      this.order.requests = this.order.requests.map(request => {
        if (request.id === item.id) {
          item.lines = item.lines.map(line => {
            if (item[this.order.currency] === 'usd') {
              line.inr = (line.qty * (75.71 * line[this.order.currency])).toFixed(2)
            }
            return line
          })
          return item
        }
        return request
      })
    },
    addProductLine (item) {
      if (item.pivot) {
        this.order.products = this.order.products.map(product => {
          if (product.id === item.id) {
            product.lines.push({
              order_id: this.order.id,
              product_id: product.id,
              qty: 1,
              supplier: product.supplier,
              usd: product.usd,
              inr: product.inr,
              prno: '',
              pono: ''
            })
          }
          return product
        })
      } else {
        this.order.requests = this.order.requests.map(product => {
          if (product.id === item.id) {
            product.lines.push({
              order_id: this.order.id,
              product_id: product.id,
              qty: 1,
              supplier: product.supplier,
              usd: product.usd,
              inr: product.inr,
              prno: '',
              pono: ''
            })
          }
          return product
        })
      }
      this.checkQtyAvailability(item)
    },
    removeProductLine (item, index) {
      item.lines.splice(index, 1)
      this.checkQtyAvailability(item)
    },
    checkQtyAvailability (item) {
      let count = 0
      item.invalidQty = false
      if (!item.lines) {
        this.order.products = this.order.products.map(product => {
          if (product.id === item.id) {
            if (item.pivot.qty > product.pivot.qty) {
              item.invalidQty = true
            }
            return item
          }
          return product
        })
      } else {
        this.order.requests = this.order.requests.map(request => {
          if (request.id === item.id) {
            item.lines = item.lines.map(line => {
              line.inr = (line.qty * (75.71 * line[this.order.currency])).toFixed(2)
              count += parseInt(line.qty)
              return line
            })
            if (count > item.qty) {
              item.invalidQty = true
            }
            return item
          }
          return request
        })
      }
    },
    /**
     * Add pr number
     **/
    addExperience () {
      this.RequestList.forEach(element => {
        element.orderserv.push({
          Quality: '',
          Supplier: '',
          Unitprice: '',
          subprice: '',
          Pr: '',
          po: ''
        })
      })
    },
    /**
     * hidedetails Card
     **/
    hideRequestCard () {
      this.hideCard = !this.hideCard
    },
    printWindow: function () {
      window.print()
    },
    showModal () {
      this.$refs['my-modal'].hide()
      this.statusProject = this.selected
    },
    openModal (ref) {
      this.$refs[ref].show()
    },
    async openProjectManagerModal (ref) {
      await this.setProjectManagers(this.order.buying_lead_id)
      console.log(this.managers)
      this.projectManagers = []
      this.managers.map(manager => {
        this.projectManagers.push({
          value: manager.id,
          text: manager.fname + ' ' + manager.lname
        })
      })
      this.$refs[ref].show()
    },
    async openBuyingLeadModal (ref) {
      await this.setBuyingLeads(this.order.buying_lead_id)
      console.log(this.leads)
      this.buyingLeads = []
      this.leads.map(lead => {
        this.buyingLeads.push({
          value: lead.id,
          text: lead.fname + ' ' + lead.lname
        })
      })
      this.$refs[ref].show()
    },
    // Changes by venkat
    async openBuyerModal (ref) {
      await this.setInternalBuyers(this.order.buying_lead_id)
      console.log(this.buyers)
      this.internalBuyers = []
      this.buyers.map(buyer => {
        this.internalBuyers.push({
          value: buyer.id,
          text: buyer.fname + ' ' + buyer.lname
        })
      })
      this.$refs[ref].show()
    },
    hideModal (ref) {
      console.log(ref)
      this.$refs[ref].hide()
    },
    managerShow () {
      this.$refs['my-modal'].hide()
      this.managerStatus = this.manageName
    },
    buyingShow () {
      this.$refs['my-modal'].hide()
      this.buyStatus = this.buyName
    },
    internalshow () {
      this.$refs['my-modal'].hide()
      this.internalStatus = this.internalname
    }
  }
}
