import Vue from 'vue'
import App from '@/app/App.vue'
import router from '@/router'
import store from '@/store'
import './vee-validate'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'
import BootstrapVue, { BTable, BootstrapVueIcons } from 'bootstrap-vue'
import OtpInput from '@bachdgvn/vue-otp-input'
import vSelect from 'vue-select'
import mixin from './mixin'

Vue.component('v-select', vSelect)
Vue.component('v-otp-input', OtpInput)
Vue.config.productionTip = false
Vue.use(BootstrapVue, BTable)
Vue.use(BootstrapVueIcons)
window.toastr = require('toastr')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(VueAxios, axios)
Vue.mixin(mixin)

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})
