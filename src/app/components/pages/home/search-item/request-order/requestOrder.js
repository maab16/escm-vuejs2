import { mapActions, mapGetters } from 'vuex'
import userMixin from '@/mixins/user'

export default {
  middleware: 'auth',
  props: ['requestList'],
  mixins: [userMixin],
  data () {
    return {
      gms: null,
      qty: null,
      days: null,
      purity: null,
      grams: [50, 70, 80, 120],
      Qty: [1, 2, 3, 4, 5],
      Days: ['42-66 days', '3-4 days', '2-5 days', '3-5 days'],
      Purity: [ 10, 98, 99, 79 ],
      dismissSecs: 3,
      dismissCountDown: 0,
      products: []
    }
  },
  mounted () {
    // console.log(this.fromlist)
    this.filterCartItems()
  },
  computed: {
    ...mapGetters('cart', [
      'isRequestItem',
      'requests'
    ])
  },
  watch: {
    requestList: function () {
      this.filterCartItems()
    }
  },
  methods: {
    ...mapActions('cart', [
      'addRequest',
      'removeRequestCart'
    ]),
    filterCartItems () {
      let products = [...this.requestList]
      this.products = products.map(product => {
        product.isCart = false
        this.requests.forEach(request => {
          if (request.cas === product.cas) {
            product.isCart = true
            product.qty = request.qty
            product.purity = request.purity
            product.description = request.description
          }
        })
        return product
      })
    },
    viewCart () {
      this.$router.push({name: 'cart'})
    },
    removeRequestFromCart (item) {
      this.removeRequestCart(item)
      this.filterCartItems()
    },
    /**
     *Add cart alerts
     */
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    addCartRequest (item) {
      if (item.qty < 1 || item.qty > 99) {
        return
      }
      if (item.purity < 50 || item.purity > 100) {
        return
      }
      if (!item.description || item.description.length < 1) {
        return
      }
      this.addRequest(item)
      this.filterCartItems()
      this.dismissCountDown = this.dismissSecs
    }
  }
}
