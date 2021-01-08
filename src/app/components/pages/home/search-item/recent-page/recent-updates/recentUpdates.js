import { mapGetters } from 'vuex'
import Spinner from '@/app/Spinner.vue'
import _ from 'lodash'

export default {
  middleware: 'auth',
  props: ['type', 'filter'],
  components: {
    Spinner
  },
  data () {
    return {
      emptyupdates: false,
      allupdates: false,
      updates: [],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('recent', [
      'recents'
    ]),
    ...mapGetters('user', [
      'user'
    ])
  },
  watch: {
    filter () {
      _.debounce(() => {
        this.fetchRecentUpdates()
      }, process.env.DEBOUNCE_WAIT_RATE)()
    }
  },
  mounted () {
    this.fetchRecentUpdates()
    if (this.updates.length === 0) {
      this.emptyupdates = true
    } else {
      this.allupdates = true
    }
  },
  methods: {
    async fetchRecentUpdates () {
      this.isLoading = true
      await this.$store.dispatch('recent/setRecentUpdates', {
        type: this.type,
        filter: this.filter
      })
      this.isLoading = false
      this.updates = this.recents
    }
  }
}
