import axios from "@/axios.js";

export function getPostList(params) {
    return axios.get('/blog/post/get/list', {params})
}

export function getPostArchive() {
    return axios.get('/blog/post/get/archive')
}

export function getPostDetail(slug) {
    return axios.get('/blog/post/get/detail/' + slug)
}