import conatctMixin from '@/mixins/contact'

export default {
  middleware: 'auth',
  mixins: [conatctMixin],
  props: ['id'],
  components: {},
  data () {
    return {
      ordernum: this.$route.params.id,
      ordersList: []
    }
  },
  computed: {
  },
  async mounted () {
    await this.getContact(this.id)
  },
  created () {},
  methods: {
  }
}
