import analytic from '@/mixins/analytic'
import Spinner from '@/app/Spinner.vue'

export default {
  middleware: ['auth', 'analytic'],
  mixins: [analytic],
  components: {
    Spinner
  },
  data () {
    return {
      type: 'successful'
    }
  },
  async mounted () {
    this.isLoading = true
    // console.log(this.type)
    await this.fetchOrders()
    // console.log(this.orders)
    // Set the initial number of orders
    this.totalRows = this.orders.length
    this.isLoading = false
  }
}
