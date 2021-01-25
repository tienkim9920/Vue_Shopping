
import axiosClient from './axiosClient'

const CartAPI = {

    getAllCart: (id) => {
        const url = `carts/${id}`
        return axiosClient.get(url)
    },

    addtoCart: (query) => {
        const url = `carts/${query}`
        return axiosClient.post(url)
    },

    deleteCart: (query) => {
        const url = `carts/${query}`
        return axiosClient.delete(url)
    },

    updateCart: (query) => {
        const url = `carts/${query}`
        return axiosClient.put(url)
    }

}

export default CartAPI