<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products">{{product.title}} - {{product.price}}</li>
    </ul>
  </div>
</template>

<script>
  import shop from '@/api/shop'
  import store from '@/store/index'
  export default {
    //below will return products from the state
    computed: {
      products () {
        //getting only products that are in stock
        return store.getters.availableProducts
      }
    },
    //everything below will run right after the instance is created
    created () {
      shop.getProducts(products => {
        // this.products = products
        //commit the name of the mutation and payload (2nd parameter)
        store.commit('setProducts', products)
      })
    }
  }
</script>

<style>
</style>
