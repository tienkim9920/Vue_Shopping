
import axiosClient from './axiosClient'

const EmailAPI = {

    sendMail: (query) => {
        const url = `email/${query}`
        return axiosClient.post(url)
    }

}

export default EmailAPI