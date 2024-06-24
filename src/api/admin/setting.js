import axios from "@/axios.js";

export function getSetting() {
    return axios.get('/admin/setting/get')
}

export function updateSetting(data) {
    return axios.post('/admin/setting/update', data)
}
