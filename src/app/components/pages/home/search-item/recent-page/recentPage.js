import recentUpdates from './recent-updates/recentUpdates.vue'
import recentorders from './recent-orders/recentOrders.vue'
import user from '@/mixins/user'
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  name: 'RecentPage',
  mixins: [user],
  components: {
    'app-Updates': recentUpdates,
    'app-orders': recentorders
  },
  computed: {
    ...mapGetters('recent', [
      'recents'
    ]),
    ...mapGetters('order', [
      'recentOrders'
    ])
  },
  async mounted () {
    await this.$store.dispatch('recent/setRecentUpdates', {
      type: 'summary',
      filter: ''
    })
    await this.$store.dispatch('order/setRecentOrders')
  }
}
