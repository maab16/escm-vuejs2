import userMixin from '@/mixins/user'
import downloadMixin from '@/mixins/download'
import { mapActions } from 'vuex'

export default {
  mixins: [userMixin, downloadMixin],
  data: () => ({
    email: '',
    accountemail: '',
    fname: '',
    lname: '',
    mobile: '',
    login: false,
    accountinfo: false,
    newuser: false,
    verify: false,
    otp: null,
    otpdata: '',
    isDisabled: false,
    isError: false,
    shouldResetOTP: false,
    otperror: false,
    verifyButton: true,
    dismissSecs: 5,
    dismissCountDown: 0,
    sending: false, // Changes by Venkat
    checkHide: false,
    status: false,
    acceptTerms: false,
    error: '',
    userData: {}
  }),
  // Changes By Venkat
  methods: {
    ...mapActions('organization', [
      'verifyOrganization'
    ]),
    /**
     * Login admin click action
     */
    // Changes By Venkat
    async loginAdmin () {
      const response = await this.verifyOrganization(this.email)
      if (response.success === true) {
        this.login = !this.login
        this.accountinfo = true
        this.error = ''
      } else if (response.success === 'internal_user') {
        this.accountemail = this.email
        if (this.getOTP === null) {
          this.sendOTP(this.email)
        }

        console.log(this.getOTP)
        this.login = !this.login
        this.accountinfo = false
        this.verify = true
        this.error = ''
      } else {
        this.error = 'Please enter valid organization or internal user email.'
        window.toastr.error(this.error)
      }
    },
    /**
     * Login user click  action
     */
    // Changes By Venkat
    async loginUsers () {
      // if (this.getDomainFromEmail(this.email) === this.getDomainFromEmail(this.accountemail)) {
      const resp = await this.verifyCustomerUser({ email: this.accountemail, organization_email: this.email })
      if (resp.status === 'success') {
        /* if (!this.getOTP) {
          this.sendOTP(this.accountemail)
        }
        } */
        // console.log(this.getOTP)
        this.accountinfo = false
        this.verify = true
        this.error = ''
      } else if (resp.status === 'user_not_found' && resp.available_count > 0) {
        this.newuser = true
        this.accountinfo = false
      } else {
        this.login = !this.login
        this.accountinfo = false
        this.error = 'Login with valid credentials.'
        window.toastr.error(this.error)
      }
    },
    /**
     * After create user action
     */
    createnewUser () {
      this.acceptTerms = true
      this.$refs['my-modal'].show()
    },
    async userAccept () {
      this.userData = {
        organization_email: this.email,
        email: this.accountemail,
        fname: this.fname,
        lname: this.lname,
        phone: this.mobile
      }
      this.createNewUser(this.userData)
      this.sendOTP(this.accountemail)
      // console.log(this.getOTP)
      this.newuser = false
      this.verify = true
      this.$refs['my-modal'].hide()
    },
    /**
     * Verify OTP
     */
    handleOnComplete (value) {
      this.otpdata = value
    },
    handleOnChange (value) {
      this.otpdata = value
      this.verifyButton = true
      if (this.otpdata.length >= 4) {
        this.verifyButton = false
      }
    },
    handleClearInput () {
      this.$refs.otpInput.clearInput()
    },
    async verifyOTP () {
      await this.verifyUser({
        email: this.accountemail,
        otp: this.otpdata
      })
      if (this.token) {
        this.setDefaultOTP()
        // this.setuser(this.accountemail)
        this.otperror = false
        this.$router.push('home')
      } else {
        this.otperror = true
      }
      return this.otpdata
    },
    backlogin () {
      this.login = false
      this.verify = false
      this.email = ''
      this.accountemail = ''
      this.fname = ''
      this.lname = ''
      this.mobile = ''
      this.otpdata = ''
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    // Changes By Venkat
    async showAlert () {
      // this.sendOTP(this.accountemail)
      if (this.sending) {
        return
      }
      this.sending = true
      this.dismissCountDown = this.dismissSecs
      const resp = await this.resendOtp({ email: this.accountemail, organization_email: this.email })
      if (resp) {
        // = 'Login with valid credentials.'
        window.toastr.success(resp.message)
      }
      this.sending = false
      // console.log(this.getOTP)
    },
    async downloadTermsOfUse () {
      await this.download('customer')
        .then(res => {
          this.forceDownload(res.data, 'Terms_Of_Use.pdf')
        })
    },
    async showTermsOfUse (type) {
      await this.getTermsOfUse(type)
      console.log(this.terms)
    },
    printWindow: function () {
      window.print()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    }
  }
}
