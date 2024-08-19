import axios from "@/axios.js";

export function getSettingName() {
    return axios.get('/app/setting/get/name')
}

export function getSettingAbout() {
    return axios.get('/app/setting/get/about')
}