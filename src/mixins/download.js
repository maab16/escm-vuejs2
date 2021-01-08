export default {
  computed: {},
  methods: {
    forceDownload (data, type) {
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', type)
      document.body.appendChild(link)
      link.click()
    }
  }
}
