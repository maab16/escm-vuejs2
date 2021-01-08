import requestFields from '@/mixins/request-table-fields'

export default {
  middleware: ['auth', 'analytic'],
  mixins: [requestFields],
  data () {
    return {
      type: 'sls'
    }
  }
}
