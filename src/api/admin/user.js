import axios from "@/axios";

export function login(username, password) {
    return axios.post("/login", {username, password})
}

export function getCurrentUserInfo() {
    return axios.get('/admin/user/get/current-user-info')
}

export function updatePassword(data) {
    return axios.post('/admin/user/update/password', data)
}