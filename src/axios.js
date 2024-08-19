import axios from "axios";
import {getToken, removeToken} from "@/composables/cookie.js";
import {showMessage} from "@/composables/util.js";

const instance = axios.create({
    baseURL: "http://localhost:8000/blog",
    timeout: 7000,
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
    // 请求头添加 Token
    const token = getToken()
    if (token && config.url.startsWith('/admin')) {
        config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
    if (response.data.code === 401) {
        showMessage(response.data.msg, 'error')
        removeToken()
        location.reload()
    }
    return response.data
}, function (error) {
    let status = err.response.status
    if (status === 401) {
        removeToken()
        location.reload()
    }

    // 展示错误信息
    let errorMsg = error.response.data.msg || '请求失败'
    showMessage(errorMsg, 'error')

    return Promise.reject(error)
})

export default instance;