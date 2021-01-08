import recentUpdates from '../search-item/recent-page/recent-updates/recentUpdates.vue'

export default {
  middleware: 'auth',
  name: 'RecentPage',
  components: {
    'app-Updates': recentUpdates
  },
  data () {
    return {
      search: ''
    }
  }
}
