
import axiosClient from './axiosClient'

const AccountAPI = {
    
    getAllAccount: () => {
        const url = 'accounts/'
        return axiosClient.get(url)
    }

}

export default AccountAPI