import axios from "@/axios.js";

export function getPostList(params) {
    return axios.get('/app/post/get/list', {params})
}

export function getPostArchive() {
    return axios.get('/app/post/get/archive')
}

export function getPostDetail(slug) {
    return axios.get('/app/post/get/detail/' + slug)
}