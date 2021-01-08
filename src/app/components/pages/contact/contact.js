import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import conatctMixin from '@/mixins/contact'

export default {
  middleware: 'auth',
  mixins: [conatctMixin],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      },
      loading: false
    }
  },
  computed: {},
  async mounted () {
    this.form.name = this.user.fname + ' ' + this.user.lname
    this.form.email = this.user.email
    this.form.company = this.user.organization ? this.user.organization.name : ''
    this.form.phone = this.user.mobile

    this.$nextTick(() => {
      this.$refs.observer.validate()
    })
  },
  methods: {
    async send () {
      this.loading = true
      await this.getInTouch(this.form)
      this.loading = false
      this.setConfirmationMessage('Message sent successfully.')
    }
  }
}
