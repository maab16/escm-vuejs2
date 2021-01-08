import analyticMixin from '@/mixins/analytic'

export default {
  middleware: 'auth',
  mixins: [analyticMixin],
  data () {
    return {
      fields: [{
        key: 'name',
        label: 'Customer'
      },
      {
        key: 'total',
        label: 'Total'
      },
      {
        key: 'sls',
        label: 'Placed With SLS'
      },
      {
        key: 'completed',
        label: 'Completed'
      },
      {
        key: 'pending',
        label: 'Pending'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      orders: []
    }
  },
  async mounted () {
    await this.setAnalyticOrders()
    console.log(this.customerOrders)
    this.orders = this.customerOrders
  }
}
