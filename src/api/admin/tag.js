import axios from "@/axios.js";

export function getTagPage(params) {
    return axios.get('/admin/tag/get/page', {params: params})
}

export function createTag(data) {
    return axios.post('/admin/tag/create', data)
}

export function deleteTag(slug) {
    return axios.get('/admin/tag/delete/' + slug)
}