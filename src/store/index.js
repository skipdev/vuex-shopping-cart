import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  //state == data
  state: {
    products: []
  },
  //getters == computed properties
  getters: {
    productsCount () {
      //...
    }
  },
  //actions == methods
  //can be complex but should never update state
  actions: {
    fetchProducts () {
      //make the AJAX call
      //run setProducts mutation
    }
  },
  //mutations == responsible for setting/updating state
  //should be as simple as possible
  //'state' should ALWAYS be first parameter
  mutations: {
    setProducts (state, products) {
      //update products
      state.products = products
    }
  }
})
