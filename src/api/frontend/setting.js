import axios from "@/axios.js";

export function getSettingName() {
    return axios.get('/blog/setting/get/name')
}

export function getSettingAbout() {
    return axios.get('/blog/setting/get/about')
}