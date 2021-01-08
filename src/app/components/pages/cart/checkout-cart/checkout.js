// import { times } from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import cartsummary from '../cart-summary/cartSummary.vue'

export default {
  middleware: 'auth',
  name: 'listResult',
  components: {
    'app-summary': cartsummary
  },

  data () {
    return {
      status: 'not_accepted',
      selected: 'Address1',
      countDown: 59,
      delivery: null
    }
  },
  async created () {
    if (this.carts.length < 1) {
      this.$router.push({name: 'cart'})
    }
    this.countDown = process.env.COUNTDOWN
    this.countDownTimer()
    await this.setDeliveryAddresses()
    if (this.addresses.length > 0) {
      this.setDeliveryAddress(this.addresses[0].id)
      this.delivery = this.deliveryAddress
    }
  },
  computed: {
    ...mapGetters('cart', [
      'carts',
      'requests',
      'addresses',
      'deliveryAddress'
    ]),
    currentRouteName () {
      return this.$route.name
    }
  },
  watch: {
    delivery: function () {
      this.setDeliveryAddress(this.delivery)
    }
  },
  methods: {
    ...mapActions('cart', [
      'setDeliveryAddresses',
      'setDeliveryAddress',
      'setCartItems'
    ]),
    /**
     * timer Countdown
     */
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
      if (this.countDown === 0 && this.currentRouteName === 'checkout') {
        this.timeOut()
      }
    },
    /**
     * Timeout modal
     */
    timeOut () {
      const h = this.$createElement
      const titleVNode = h('div', {
        class: ['']
      }, [])
      const messageVNode =
        h('div', {
          class: ['text-center']
        }, [
          h('i', {
            class: ['sls-icons sls-50 timmer']
          }, [h('')]),
          h('h4', {
            class: ['text-info fw-500']
          },
          [
            'Time out'
          ]),
          h('p', {
            class: ['pt-20']
          }, [
            'You have exceeded the time limit for this booking. We need to reconfirm the availabity of order selected by you.'
          ])
        ])
      this.select = ''
      this.$bvModal.msgBoxConfirm([messageVNode], {
        title: [titleVNode],
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'primary',
        okTitle: 'Reconfirm availability',
        cancelTitle: 'Back to cart',
        cancelVariant: 'link',
        hideHeaderClose: true,
        centered: true,
        headerClass: 'p-2 border-bottom-0 text-center',
        footerClass: 'p-2 border-top-0 text-center justify-content-center'
      })
        .then(value => {
          if (value === true) {
            this.showModal()
          } else {
            this.$router.push('/cart')
          }
        })
        .catch({})
    },
    showModal () {
      this.$refs['my-modal'].show()
      setTimeout(() => {
        this.setCartItems()
        this.carts.forEach(cart => {
          if (cart.availability === 0) {
            this.$router.push('/cart')
          }
        })
        this.countDown = process.env.COUNTDOWN
        this.countDownTimer()
        this.$refs['my-modal'].hide()
      }, 2000)
    }
  }
}
