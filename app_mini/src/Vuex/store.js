import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
      idTemp: 'abc123',
      idUser: '',
      carts: []
  },
  mutations: {
    addToCart(state, data){

      const cart = data
      console.log("Value: ", cart.idProduct)

      //Clone carts hiện tại ra
      const cloneCarts = state.carts

      if (cloneCarts.length < 1){

        cloneCarts.push(cart)

      }else{

        const index = cloneCarts.findIndex(value => {
          return value.idProduct === cart.idProduct
        })

        const findCart = cloneCarts.find(value => {
          return value.idProduct === cart.idProduct
        })

        if (!findCart){
          
          cloneCarts.push(cart)
          console.log("Push")

        }else{

          cloneCarts[index].count = parseInt(cloneCarts[index].count) + parseInt(cart.count)
          console.log("Update")

        }

      }
      
      state = {
        idTemp: cart.idUser,
        carts: cloneCarts
      }
      
      return state
    },

    deleteToCart(state, data) {

      console.log("Value: ", data)

      const newCarts = state.carts
      newCarts.splice(data, 1)

      state = {
        idTemp: state.idTemp,
        carts: newCarts
      }

      return state

    },

    updateToCart(state, data) {

      console.log("Count: ", data)

      const newCarts = state.carts

      const index = newCarts.findIndex(value => {
        return value.idProduct === data.idProduct
      })

      newCarts[index].count = data.count

      state = {
        idTemp: state.idTemp,
        carts: newCarts
      }

      return state

    },

    addSession(state, data) {
      console.log("IdUser: ", data)

      const cloneCarts = state.carts
      const cloneIdTemp = state.idTemp

      state.idTemp = cloneIdTemp
      state.idUser = data
      state.carts = cloneCarts

      console.log(state)
    },

    deleteSession(state, data) {
      console.log('IdUser: ', data)

      const cloneCarts = state.carts
      const cloneIdTemp = state.idTemp

      state.idTemp = cloneIdTemp
      state.idUser = data
      state.carts = cloneCarts

      console.log(state)
    }

    
  },

})

export default store