import axios from "@/axios.js";

export function getTagAll() {
    return axios.get('/app/tag/get/all')
}