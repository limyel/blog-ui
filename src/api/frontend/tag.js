import axios from "@/axios.js";

export function getTagAll() {
    return axios.get('/blog/tag/get/all')
}