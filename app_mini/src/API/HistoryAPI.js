
import axiosClient from './axiosClient'

const HistoryAPI = {

    getHistory: (query) => {
        const url = `history/${query}`
        return axiosClient.get(url)
    }

}

export default HistoryAPI