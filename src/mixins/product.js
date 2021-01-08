import { mapActions, mapGetters } from 'vuex'
import userMixin from '@/mixins/user'

export default {
  mixins: [userMixin],
  computed: {
    ...mapGetters('product', [
      'products',
      'searchTerm',
      'getSearchProducts',
      'isCasNumber',
      'isSearch',
      'getProductsByCas',
      'keywords',
      'advancedOptionS'
    ])
  },
  methods: {
    ...mapActions('product', [
      'setProducts',
      'searchKeywords',
      'removeSearchTag',
      'advancedSearchProducts',
      'setKeywords',
      'setAdvancedOptions',
      'setLastSearch'
    ]),
    isCasAvailable (cas, items) {
      let isAvailable = false

      items.map(item => {
        if (item.cas.trim().toLowerCase() === cas.trim().toLowerCase()) {
          isAvailable = true
        }
      })

      return isAvailable
    },
    async advancedSearch (options, tags, orderBy = null, orderDirection = 'desc') {
      tags = !tags || tags.length === 0 ? this.value : tags
      tags = tags.filter((value, index, self) => {
        return self.indexOf(value) === index
      })

      this.setKeywords(tags)
      this.setAdvancedOptions(options)

      this.isLoading = true

      await this.advancedSearchProducts({
        options: options,
        tags: tags,
        orderBy: orderBy,
        orderDirection: orderDirection
      })

      this.isLoading = false

      this.searchItems = this.getSearchProducts

      if (tags.length > 0) {
        tags.map(cas => {
          // if (this.getProductsByCas(cas).length < 1) {
          if (!this.isCasAvailable(cas, this.searchItems) && !this.searchTerm[cas]) {
            this.searchItems.push({
              cas: cas,
              name: cas,
              supplier: options.supplier,
              purity: options.purity,
              qty: options.qty,
              warehouse: options.warehouse,
              packsize: options.packsize,
              delivery: options.delivery,
              availability: 0
            })
          }
        })
      }
      this.setLastSearch()
      this.recentPage = false
      this.disabled = true
      this.topSearchbar = true
      this.isAdvancedSearch = false
      this.advanceFilter = false
    },
    /**
     *search Result Function
     */
    searchResult (tags) {
      let options = {
        supplier: null,
        purity: null,
        qty: null,
        warehouse: null,
        packsize: null,
        delivery: null
      }

      this.advancedSearch(options, tags)
      this.recentPage = false
      this.disabled = true
      this.topSearchbar = true
      this.isAdvancedSearch = false
    },
    getAdavacedOptions (tags, option) {
      let purities = []
      let quantities = []
      let packsizes = []
      let suppliers = []
      let warehouses = []
      let deliveries = []
      if (this.products.length > 0) {
        this.products.map(product => {
          purities.push(product.purity)
          if (product.availability > 0) {
            quantities.push(product.availability)
          }
          packsizes.push(product.packsize)
          suppliers.push(product.supplier)
          warehouses.push(product.warehouse)
          deliveries.push(product.delivery)
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
      return {
        purities: purities,
        quantities: quantities,
        packsizes: packsizes,
        suppliers: suppliers,
        warehouses: warehouses,
        deliveries: deliveries
      }
    }
  }
}
