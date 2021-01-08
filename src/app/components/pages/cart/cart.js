import { mapActions, mapGetters } from 'vuex'
import cartSummary from './cart-summary/cartSummary.vue'
import emptyCart from './empty-cart/emptyCart.vue'

export default {
  middleware: 'auth',
  components: {
    'app-summary': cartSummary,
    'app-empty': emptyCart
  },

  data () {
    return {
      gms: null,
      qty: null,
      days: null,
      purity: null,
      grams: ['120', '50', '75', '100'],
      Qty: ['1', '2', '30'],
      Days: ['2-7 Days', '3-7 Days', '5-7 Days'],
      Purity: ['98', '99', '40'],
      options: [1, 2, 3, 4],
      ordercheck: true,
      requestCheck: true,
      selectcheck: [],
      singleRequest: [],
      selectedList: [],
      requestedList: [],
      emptycartList: false,
      recentDeleted: false,
      requestItem: {}
    }
  },
  created () {
    if ((this.orderList.length + this.requestList.length) < 1) {
      this.emptycartList = true
    }
    // this.orderList = this.carts
    // this.requestList = this.requests
  },
  async mounted () {
    await this.fetchCartItems()
    this.selectcheck = this.orderList
    this.singleRequest = this.requestList
    // this.setCheckList(this.selectcheck)
    // this.setOnlyRequestList(this.singleRequest)
  },
  computed: {
    ...mapGetters('cart', {
      orderList: 'carts',
      requestList: 'requests',
      updatedAt: 'updatedAt'
    }),
    ...mapGetters('product', [
      'currency'
    ])
  },
  watch: {
    selectcheck: function () {
      this.setCheckList(this.selectcheck)
    },
    singleRequest: function () {
      this.setOnlyRequestList(this.singleRequest)
    }
    // carts: function () {
    //   console.log(this.carts)
    //   this.orderList = this.carts
    //   this.requestList = this.requests
    //   this.selectcheck = this.orderList
    //   this.singleRequest = this.requestList
    // }
  },
  methods: {
    ...mapActions('cart', [
      'setCartItems',
      'setCheckList',
      'setOnlyRequestList',
      'removeCart',
      'removeAllCart',
      'removeRequestCart',
      'updateCart',
      'changeCartToRequest'
    ]),
    async fetchCartItems () {
      await this.setCartItems()
    },
    updateCartPrice (item) {
      this.updateCart(item)
    },
    getAvailableQty (item) {
      let numbers = []
      let n = 1
      while (n <= item.availability) {
        numbers.push(n)
        n++
      }
      return numbers
    },
    /**
     * order All select
     */
    checkAll () {
      this.ordercheck = !this.ordercheck
      this.selectcheck = []
      if (this.ordercheck) { // Check all
        for (var key in this.orderList) {
          this.selectcheck.push(this.orderList[key])
        }
        this.recentDeleted = true
      } else {
        this.recentDeleted = true
      }
    },
    /**
     * order single select
     */
    updateCheckall () {
      if (this.selectcheck.length === this.orderList.length) {
        this.ordercheck = true
      } else {
        this.ordercheck = false
        this.recentDeleted = true
      }
    },
    /**
     * request All select
     */
    RequestAll () {
      this.requestCheck = !this.requestCheck
      this.singleRequest = []
      if (this.requestCheck) { // Check all
        for (var key in this.requestList) {
          this.singleRequest.push(this.requestList[key])
        }
        this.requestsSelectdelte = true
      } else {
        this.requestsSelectdelte = false
      }
    },
    /**
     * reqest single select
     */
    requestCheckall () {
      if (this.requestCheck.length === this.requestList.length) {
        this.requestCheck = true
        this.requestsSelectdelte = false
      } else {
        this.requestCheck = false
        this.requestsSelectdelte = true
      }
    },
    removeItem (item, type = 'normal') {
      const h = this.$createElement
      const titleVNode = h('div', {
        class: ['position-absolute p-0 w-100 d-flex justify-content-center']
      }, [])
      // More complex structure
      const messageVNode = h('div', {}, [
        h('p', {
          class: ['text-left pb-20 fw-600 text-uppercase']
        }, [
          'Remove'
        ]),
        h('p', {
          class: ['text-left']
        }, [
          'Are you sure you want remove selected Items?'
        ])
      ])
      this.select = ''
      this.$bvModal.msgBoxConfirm(
        [messageVNode], {
          title: [titleVNode],
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Remove',
          cancelTitle: 'Cancel',
          cancelVariant: 'link',
          hideHeaderClose: true,
          centered: true,
          headerClass: 'p-0 border-bottom-0',
          footerClass: 'pb-2 border-top-0'
        })
        .then(value => {
          if (value === true) {
            if (type === 'normal' || type === 'online') {
              this.selectcheck = this.selectcheck.filter(selectcheck => {
                if (selectcheck.id !== item.id) {
                  return selectcheck
                }
              })
              this.removeCart(item)
            }
            if (type === 'request') {
              this.singleRequest = this.singleRequest.filter(singleRequest => {
                if (singleRequest.id !== item.id) {
                  return singleRequest
                }
              })
              this.removeRequestCart(item)
            }

            if ((this.orderList.length + this.requestList.length) < 1) {
              this.emptycartList = true
            }
            this.recentDeleted = false
          }
        })
    },
    /**
     * order delete value
     */
    orderDelete () {
      this.selectedList = []
      this.selectcheck.forEach((res) => {
        this.removeCart(res)
        // this.orderList.splice(this.selectcheck.indexOf(res.id))
      })
      this.singleRequest.forEach((res) => {
        this.removeRequestCart(res)
        // this.orderList.splice(this.selectcheck.indexOf(res.id))
      })
      this.selectcheck = this.orderList
      this.singleRequest = this.requestList
    },
    /**
     * empty cart
     */
    emptyCart () {
      const h = this.$createElement
      const titleVNode = h('div', {
        class: ['position-absolute pt-10 pb-10 w-100 d-flex justify-content-center']
      }, [])
      const messageVNode = h('div', {
        class: ['foobar']
      }, [
        h('p', {
          class: ['text-uppercase fw-600']
        }, [
          'Empty Cart'
        ]),
        h('p', {
          class: ['pt-15']
        }, [
          'Are you sure want to empty your cart ?'
        ])
      ])
      this.$bvModal.msgBoxConfirm([messageVNode], {
        title: [titleVNode],
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'primary',
        okTitle: 'Yes',
        cancelTitle: 'No',
        cancelVariant: 'link',
        hideHeaderClose: true,
        centered: true,
        headerClass: 'p-0 border-bottom-0',
        footerClass: 'p-2 border-top-0'
      })
        .then(value => {
          if (value === true) {
            this.removeAllCart()
            this.emptycartList = true
          }
        })
    },
    /**
     * reload page
     * */
    reloadcart () {
      this.fetchCartItems()
      console.log(this.updatedAt)
      // this.$router.push({
      //   name: 'reload',
      //   params: {
      //     name: 'cart'
      //   }
      // })
      // this.$router.go()
    },
    /**
     * request Modal show
     * */
    showModal (item) {
      this.requestItem = {...item}
      this.$refs['my-modal'].show()
    },
    requestChange () {
      if (this.requestItem.qty < 1 || this.requestItem.qty > 99) {
        return
      }
      if (this.requestItem.purity < 50 || this.requestItem.purity > 100) {
        return
      }
      if (!this.requestItem.description || this.requestItem.description.length < 1) {
        return
      }

      this.changeCartToRequest(this.requestItem)
      this.fetchCartItems()
      this.singleRequest = this.requestList
      this.$refs['my-modal'].hide()
      // this.orderList.find(list => list.id === 3).request = false
    }
  }
}
