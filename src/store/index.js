import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  //state == data
  state: {
    products: []
  },
  //getters == computed properties
  //good for calculating or filtering something on runtime (eg. live total)
  //first parameter is always state, second is getters
  getters: {
    //creating a getter that will give us the available products
    availableProducts (state, getters) {
      //checking whether a product is in stock
      return state.products.filter(product => product.inventory > 0)
    }
  },
  //actions == methods
  //control when a mutation should be fired
  //can be complex but should never update state
  //fetching products from API
  //first parameter is context
  actions: {
    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        //make the AJAX call
        //run setProducts mutation
        shop.getProducts(products => {
          // this.products = products
          //commit the name of the mutation and payload (2nd parameter)
          commit('setProducts', products)
          resolve()
        })
      })
    }
  },
    // *EXAMPLE ACTION BELOW*
    // addToCart (context, product) {
    //   //first, check if a product is in stock
    //   if (product.inventory > 0) {
    //     context.commit('pushProductToCart', product)
    //   } else {
    //     //show out of stock message
    //   }
    // }
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
