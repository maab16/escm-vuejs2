export default {
  middleware: 'auth',
  data () {
    return {

    }
  },
  methods: {
    routeBack () {
      this.$router.go(-1)
    }
  }
}
