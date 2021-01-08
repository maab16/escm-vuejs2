import user from '@/mixins/user'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [user],
  computed: {
    ...mapGetters('contact', [
      'contacts',
      'contact',
      'confirmationMessage'
    ])
  },
  methods: {
    ...mapActions('contact', [
      'getInTouch',
      'getContacts',
      'getContact',
      'setConfirmationMessage'
    ])
  }
}
