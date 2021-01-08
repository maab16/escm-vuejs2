import { mapActions, mapGetters } from 'vuex'
import userMixin from '@/mixins/user'

export default {
  middleware: 'auth',
  name: 'listResult',
  mixins: [userMixin],
  components: {
  },
  data () {
    return {
      checkoutList: false,
      order: false,
      orderList: [],
      currency: 'inr'
    }
  },
  created () {
    // this.checkList = this.carts
    // this.requestList = this.requests
  },
  computed: {
    ...mapGetters('cart', [
      'checkList',
      'requestList',
      'deliveryAddress'
    ]),
    ...mapGetters('product', {
      productCurrency: 'currency'
    }),
    currentRouteName () {
      return this.$route.name
    },
    total () {
      let amount = 0
      this.checkList.map(order => {
        amount += order[this.currency] * (order.qty > 1 ? order.qty : 1)
      })

      return amount.toFixed(2)
    }
  },
  watch: {
    productCurrency: function () {
      this.currency = this.productCurrency
    }
  },
  beforeMount () {
    if (this.currentRouteName === 'cart') {
      this.checkoutList = true
    } else if (this.currentRouteName === 'checkout') {
      this.order = true
    }
  },
  mounted () {
    this.currency = this.productCurrency
    if (this.$route.hash) {
      setTimeout(() => this.scrollFix(this.$route.hash), 500)
    }
  },
  methods: {
    ...mapActions('order', [
      'makeOrder'
    ]),
    ...mapActions('cart', [
      'removeAllCart',
      'setCartItems',
      'setCheckList'
    ]),
    getCheckList () {
      return this.checkList.filter(list => list.availability !== 0)
    },
    scrollFix (hashbang) {
      location.href = hashbang
    },
    confirmModal () {
      this.$refs['confirm-modal'].show()
      setTimeout(() => {
        this.$refs['confirm-modal'].hide()
        this.orderConfirm()
      }, 2000)
    },
    checkout () {
      this.$router.push({
        name: 'checkout'
      })
    },
    checkoutNotify () {

    },
    async orderConfirm () {
      if (this.checkList.length + this.requestList.length < 1) {
        this.$router.push({name: 'cart'})
      }
      if (!this.deliveryAddress) {
        return
      }
      this.setCartItems()
      this.checkList.forEach(cart => {
        if (cart.availability === 0) {
          this.$router.push('/cart')
        }
      })

      let data = await this.makeOrder({
        'products': this.checkList,
        'requests': this.requestList
      })

      console.log(data)

      // this.removeAllCart()

      if (data.success) {
        this.removeAllCart()
      }

      const h = this.$createElement
      const messageVNode = h('div', {
        class: ['text-center']
      }, [
        h('i', { class: ['sls-icons sls-60 confirm'] }, [h('')]),
        h('h4', {
          class: ['text-info fw-500']
        },
        [
          'Order Confirmed'
        ]),
        h('p', {
          class: ['pt-20']
        }, [
          'Order has been placed succesfully and an invoice has been emailed to you.' ])
      ])
      this.select = ''
      this.$bvModal.msgBoxConfirm([messageVNode], {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'primary',
        okTitle: 'View order',
        cancelTitle: 'Back to home',
        cancelVariant: 'link',
        hideHeaderClose: true,
        centered: true,
        headerClass: 'p-2 border-bottom-0 text-center',
        footerClass: ' m-auto p-2 border-top-0 text-center'
      })
        .then(value => {
          if (value === true) {
            this.$router.push({name: 'order-detail', params: {id: data.id}})
          } else {
            this.$router.push('/home')
          }
        })
        .catch({})
    }
  }
}
