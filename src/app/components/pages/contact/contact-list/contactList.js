import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Spinner from '@/app/Spinner.vue'
import conatctMixin from '@/mixins/contact'
import _ from 'lodash'

export default {
  middleware: 'auth',
  mixins: [conatctMixin],
  components: {
    ValidationObserver,
    ValidationProvider,
    Spinner
  },
  data () {
    return {
      address: null,
      customer: null,
      projectManager: null,
      buyingLead: null,
      internalBuyer: null,
      from: '',
      to: '',
      addresses: [],
      customers: [],
      projectManagers: [],
      internalBuyers: [],
      buyingLeads: [],
      showDecadeNav: false,
      hideHeader: true,
      filterSection: false,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      orderFilterKey: 'all',
      countlist: [],
      fields: [
        {
          key: 'id',
          label: 'Contact No.',
          sortable: true
        },
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true
        },
        {
          key: 'company',
          label: 'Company',
          sortable: true
        },
        {
          key: 'phone',
          label: 'Phone',
          sortable: true
        },
        {
          key: 'message',
          label: 'Message',
          sortable: true
        },
        {
          key: 'created_at',
          label: 'Created At',
          sortable: true
        },
        {
          key: 'updated_at',
          label: 'Updated At',
          sortable: true
        },
        {
          key: 'meta',
          label: ''
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      contactList: [],
      isLoading: false
    }
  },
  /**
     *click awy directives
     */
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    
  },
  watch: {
   
  },
  async mounted () {
    this.isLoading = true
    await this.getContacts()
    this.isLoading = false
    this.contactList = this.contacts
  },
  methods: {

  }
}
