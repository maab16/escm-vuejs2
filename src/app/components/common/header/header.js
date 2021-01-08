import headerMixin from '@/mixins/header'

export default {
  mixins: [headerMixin],
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'INR' },
        { value: 'a', text: 'USA' }
      ],
      mobileNav: false,
      currency: 'inr',
      totalCart: 0
    }
  },
  mounted () {
    this.totalCart = this.total
    this.currency = this.productCurrency
  },
  watch: {
    $route (to, from) {
      const el = document.body
      this.mobileNav = false
      el.classList.remove('overflow-hide')
    },
    total: function () {
      this.totalCart = this.total
    },
    productCurrency: function () {
      this.currency = this.productCurrency
    }
  },
  computed: {
    hrefTarget () {
      return (this.enabled ? '_blank' : '_self')
    }
  },
  methods: {
    toggleBodyClass () {
      const el = document.body
      this.mobileNav = !this.mobileNav
      if (this.mobileNav === true) {
        el.classList.add('overflow-hide')
      } else {
        el.classList.remove('overflow-hide')
      }
    }
  }
}
