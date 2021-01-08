import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', [
      'user',
      'token',
      'check',
      'can',
      'terms',
      'hasPermission',
      'hasRole',
      'isAdmin',
      'isSupplierManager',
      'isManager',
      'isBuyingLead',
      'isInternalBuyer',
      'isCustomer',
      'isCustomerUser',
      'getOTP',
      'resendOtp',
      'getNameFromEmail',
      'getDomainFromEmail'
    ])
  },
  methods: {
    ...mapActions('user', [
      'sendOTP',
      'createNewUser',
      'loginInternalUser',
      'verifyUser',
      'verifyCustomerUser',
      'logout',
      'setDefaultOTP',
      'getTermsOfUse',
      'download'
    ])
  }
}
