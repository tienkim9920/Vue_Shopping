
import axiosClient from './axiosClient'

const ProductAPI = {
    
    getCategoryAPI: (query) => {
        const url = `clothes/category/${query}`
        return axiosClient.get(url)
    },

    getDetail: (id) => {
        const url = `clothes/detail/${id}`
        return axiosClient.get(url)
    }

}

export default ProductAPI