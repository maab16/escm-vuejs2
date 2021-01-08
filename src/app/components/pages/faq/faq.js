import { mapGetters, mapActions } from 'vuex'
import Spinner from '@/app/Spinner.vue'

export default {
  middleware: 'auth',
  components: {
    Spinner
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('faq', [
      'faqs'
    ])
  },
  async created () {
    this.isLoading = true
    await this.setFaqs()
    this.isLoading = false
  },
  methods: {
    ...mapActions('faq', [
      'setFaqs'
    ])
  }
}
