<template>
  <p>Hello</p>
</template>

<script>
export default {
  name: 'relaod',
  created () {
    let args = this.$route.params.args !== null || this.$route.params.args !== undefined
      ? this.$route.params.args : null

    console.log(this.$route.params.name)

    if (this.$route.params.name !== null) {
      if (args !== null) {
        this.$router.push({name: this.$route.params.name, params: args})
      } else {
        this.$router.push({name: this.$route.params.name})
      }
    }
  }
}
</script>
