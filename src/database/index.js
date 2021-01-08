import VuexORM, { Database, Model } from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import VuexORMSearch from '@vuex-orm/plugin-search'

VuexORM.use(VuexORMAxios)
VuexORM.use(VuexORMSearch)

const database = new Database()
const modelContext = require.context('../Modules', true, /.*.model.js$/, 'sync')

modelContext.keys()
  .map(file => {
    const model = modelContext(file)
    if (model.default && model.default.prototype instanceof Model) {
      if (model.VuexModule) {
        database.register(model.default, model.VuexModule)
      } else {
        database.register(model.default)
      }
    }
  })

export default database
