import user from '@/mixins/user'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [user],
  computed: {
    ...mapGetters('cart', [
      'total'
    ]),
    ...mapGetters('product', {
      productCurrency: 'currency'
    })
  },
  methods: {
    ...mapActions('product', [
      'setCurrency'
    ]),
    changeCurrency (currency) {
      this.currency = currency
      this.setCurrency(currency)
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      // Fallback to login
      this.$router.push({ name: 'login' })
    }
  }
}
