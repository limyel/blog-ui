import axios from "axios";
import {getToken} from "@/composables/auth.js";
import {showMessage} from "@/composables/util.js";

const instance = axios.create({
    baseURL: "http://localhost:8000/blog",
    timeout: 7000,
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
    // 请求头添加 Token
    const token = getToken()
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    // 展示错误信息
    let errorMsg = error.response.data.msg || '请求失败'
    showMessage(errorMsg, 'error')

    return Promise.reject(error)
})

export default instance;