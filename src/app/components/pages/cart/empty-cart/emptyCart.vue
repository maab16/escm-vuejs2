<template>
  <div class="empty-cart">
      <img src="~@/assets/images/emptycart.svg" alt="empty_cart"/>
      <div class="empty-circle"></div>
    <h3 class="pt-20 fw-400 text-info">Your cart Looks empty</h3>
    <P class="pt-10 pb-20 small">Looks like you haven’t made your choice yet.</P>
    <router-link class="btn btn-primary" to="/home">Search products</router-link>
  </div>
</template>
<script>
export default {
}
</script>
