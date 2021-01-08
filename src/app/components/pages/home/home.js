import searchItem from './search-item/searchItem.vue'

export default {
  middleware: 'auth',
  name: 'home',
  components: {
    'app-search': searchItem
  }
}
