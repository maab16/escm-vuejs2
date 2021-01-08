import { mapActions, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  props: {
    advancedSearch: {
      type: Function,
      required: true
    },
    advancedOption: {
      type: Object,
      required: true
    },
    tags: Array,
    filterOptions: Object
  },
  components: {},
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    this.options = this.filterOptions
  },
  computed: {
    ...mapGetters('product', [
      'getAdavacedOptions'
    ])
  },
  watch: {
    advancedOption: function () {
      console.log(this.advancedOption)
    }
  },
  methods: {
    ...mapActions('product', [
      'setAdvancedOptions'
    ]),
    updateFilterOption () {
      this.options = this.getAdavacedOptions(this.tags, this.advancedOption)
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.$router.push('/order')
    },
    /**
     * filter Reset
     */
    onReset (evt) {
      evt.preventDefault()
      this.advancedOption.supplier = null
      this.advancedOption.warehouse = null
      this.advancedOption.packsize = null
      this.advancedOption.qty = null
      this.advancedOption.purity = null
      this.advancedOption.delivery = null
      this.$emit('reset-tags')
      this.setAdvancedOptions(this.advancedOption)
      this.options = this.getAdavacedOptions(this.tags, this.advancedOption)
      this.$nextTick(() => {})
    }
  }
}
