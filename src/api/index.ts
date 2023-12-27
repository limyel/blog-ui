import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(res => {
    if (res.data.code === 0) {
        return res.data.data
    }
    return res.data
}, err => {
    return Promise.reject(err)
})

export default axios