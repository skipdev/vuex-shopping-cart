<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="http://gifimage.net/wp-content/uploads/2018/04/loading-spinner-gif-7.gif"
    />
    <ul v-else>
      <li v-for="product in products">
        {{product.title}} - {{product.price | currency}}
        <button @click="addProductToCart(product)">Add to Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false
      }
    },

    //below will return products from the state
    computed: {
      products () {
        //getting only products that are in stock
        return this.$store.getters.availableProducts
      }
    },

    methods: {
      addProductToCart (product) {
        this.$store.dispatch('addProductToCart', product)
      }
    },

    //everything below will run right after the instance is created
    created () {
      this.loading = true
      this.$store.dispatch('fetchProducts')
        .then(() => this.loading = false)
    }
  }
</script>

<style>
</style>
