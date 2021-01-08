import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import Loginsliders from './login-sliders/loginSlider.vue'
import Logo from '../../common/logo/logo.vue'
import login from '@/mixins/login'

export default {
  middleware: 'guest',
  mixins: [login],
  components: {
    'app-loginslider': Loginsliders,
    ValidationObserver,
    ValidationProvider,
    'app-logo': Logo
  },
  mounted () {
    this.$root.$on('clickedSomething', () => {
    })

    // window.addEventListener('keyup', event => {
    //   if (event.keyCode === 13) {
    //     this.verifyOTP()
    //   }
    // })
  }
}
