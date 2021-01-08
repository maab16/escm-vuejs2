import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from '@/database'

Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('../Modules', true, /.*.store.js$/, 'sync')

const modules = []

requireContext.keys()
  .map(file => {
    const partials = file.replace(/(^.\/)|(\.store.js$)/g, '').split('/')
    const moduleName = partials[partials.length - 1].toLowerCase()
    const context = requireContext(file)
    const module = {...context.default}
    module.namespaced = true
    modules[moduleName] = module
  })

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  modules
})
