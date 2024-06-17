import axios from "@/axios.js";

export function getTagPage(data) {
    return axios.get('/admin/tag/get/page', {params: data})
}