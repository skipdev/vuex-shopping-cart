import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  //state == data
  state: {
    products: [],
    //holding product id and the amount being purchased
    cart: []
  },
  //getters == computed properties
  //good for calculating or filtering something on runtime (eg. live total)
  //first parameter is always state, second is getters
  getters: {
    //creating a getter that will give us the available products
    availableProducts (state, getters) {
      //checking whether a product is in stock
      return state.products.filter(product => product.inventory > 0)
    },

    cartProducts (state) {
      return state.cart.map(cartItem => {
        //getting the actual product
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
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
          //this.products = products
          //commit the name of the mutation and payload (2nd parameter)
          commit('setProducts', products)
          resolve()
        })
      })
    },

    addProductToCart (context, product) {
      if (product.inventory > 0) {
        //checking inventory has at least 1 product available
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementItemQuantity', cartItem)
        }
        //decreases product inventory when user adds a product
        context.commit('decrementProductInventory', product)
      }
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
  //2nd parameter is what you are affecting
  mutations: {
    setProducts (state, products) {
      //update products
      state.products = products
    },

    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
})
