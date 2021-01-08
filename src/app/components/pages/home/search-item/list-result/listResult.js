import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import userMixin from '@/mixins/user'
import { mapActions, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  name: 'listResult',
  mixins: [userMixin],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: ['searchItems', 'advancedSearch', 'advancedOption', 'tags'],
  data () {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      location: '',
      filterSection: false,
      selected: null,
      options: [1, 2, 3, 4],
      disabled: true,
      filterOrders: '',
      filterDirection: 'DESC',
      directionList: ['DESC', 'ASC'],
      filterList: ['Delivery Time', 'Price', 'Availability', 'Purity'],
      Supplier: [],
      Warehouse: [],
      Pack: [],
      Quantity: [],
      Purity: [],
      Delivery: [],
      items: []
    }
  },
  created () {
    this.filterCartItems()
    this.options = this.getAdavacedOptions()
  },
  /**
     *click awy directives
     */
  directives: {
    onClickaway: onClickaway
  },
  beforeMount () {
    this.showlist = this.searchItems.length
  },
  computed: {
    ...mapGetters('cart', [
      'isCartItem',
      'carts'
    ]),
    ...mapGetters('product', [
      //'getAdavacedOptions',
      'getLastSearch'
    ])
  },
  watch: {
    filterOrders: function () {
      this.filterByWithOrder()
    },
    filterDirection: function () {
      this.filterByWithOrder()
    },
    searchItems: function () {
      this.filterCartItems()
      this.options = this.getAdavacedOptions();
    }
  },
  methods: {
    ...mapActions('cart', [
      'addCart',
      'removeCart'
    ]),
    ...mapActions('product', [
      'setAdvancedOptions'
    ]),
    refreshItems () {
      this.filterByWithOrder()
    },
    getQuantities (item) {
      let quantities = []
      for (let i = 1; i <= item.availability; i++) {
        quantities.push(i)
      }
      return quantities
    },
    updateFilterOption () {
      this.options = this.getAdavacedOptions()
    },
    filterByWithOrder () {
      let filterBy = this.filterOrders.toLowerCase()
      let direction = this.filterDirection.toLowerCase()
      if (filterBy === 'delivery time') {
        filterBy = 'delivery'
      } else if (filterBy === 'price') {
        filterBy = 'usd'
      }
      this.advancedSearch(this.advancedOption, this.tags, filterBy, direction)
    },
    filterCartItems () {
      let items = [...this.searchItems]
      this.items = items.map(item => {
        item.isCart = false
        this.carts.forEach(cart => {
          if (cart.id === item.id && cart.cas === item.cas) {
            item.isCart = true
            item.qty = cart.qty
          }
        })
        return item
      })
    },
    filterAdvancedSearch () {
      console.log(this.advancedOption)
      let filterBy = this.filterOrders.toLowerCase()
      if (filterBy === 'delivery time') {
        filterBy = 'delivery'
      } else if (filterBy === 'price') {
        filterBy = 'usd'
      }
      this.advancedSearch(this.advancedOption, this.tags, filterBy)
    },
    /**
     *Add cart alerts
     */
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    addToCart (item) {
      this.addCart(item)
      this.filterCartItems()
      this.dismissCountDown = this.dismissSecs
    },
    removeFromCart (item) {
      this.removeCart(item)
      this.filterCartItems()
    },
    viewCart () {
      this.$router.push({name: 'cart'})
    },
    /**
     *click away method
     */
    sortfilter () {
      this.filterSection = false
    },
    /**
     *click away filtersearch
     */
    filterSearch () {
      this.filterSection = !this.filterSection
    },
    onSubmit (evt) {
      evt.preventDefault()
      console.log('submited')
      this.$router.push('/order')
    },
    /**
     *reset advance search Form
     */
    onReset (evt) {
      evt.preventDefault()
      this.advancedOption.supplier = null
      this.advancedOption.warehouse = null
      this.advancedOption.packsize = null
      this.advancedOption.qty = null
      this.advancedOption.purity = null
      this.advancedOption.delivery = null
      //this.setAdvancedOptions(this.advancedOption)
      this.options = this.getAdavacedOptions()
      this.$nextTick(() => {})
    },
    getAdavacedOptions () {
      let purities = []
      let quantities = []
      let packsizes = []
      let suppliers = []
      let warehouses = []
      let deliveries = []
      if (this.items.length > 0) {
        this.items.map(product => {
          if(product.purity){
            purities.push(product.purity)
          }
          if (product.availability > 0) {
            quantities.push(product.availability)
          }
          if(product.packsize){
            packsizes.push(product.packsize)
          }
          if(product.supplier){
            suppliers.push(product.supplier)
          }
         if(product.warehouse){
           warehouses.push(product.warehouse)
         }
         if(product.delivery){
           deliveries.push(product.delivery)
         }

        })
      }
      purities = purities.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
      quantities = quantities.filter((value, index, self) => {
        return self.indexOf(value) === index
      }).sort()
      packsizes = packsizes.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
      suppliers = suppliers.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
      warehouses = warehouses.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
      deliveries = deliveries.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
      let ob = {
        purities,
        quantities,
        packsizes,
        suppliers,
        warehouses,
        deliveries
      }
      return ob
    }

    /**
     * go Cart throght path
     */
    // goCart (res) {
    //   console.log(res)
    //   this.$router.push({ path: '/cart' })
    // }
  }
}
