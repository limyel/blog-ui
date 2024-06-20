import axios from "@/axios.js";

export function getPostPage(params) {
    return axios.get('/admin/post/get/page', {params: params})
}

export function deletePost(id) {
    return axios.get('/admin/post/delete/' + id)
}

export function createPost(data) {
    return axios.post('/admin/post/create', data)
}

export function getPostById(id) {
    return axios.get('/admin/post/get/by/' + id)
}

export function updatePost(data) {
    return axios.post('/admin/post/update', data)
}



export function getPostList(params) {
    return axios.get('/blog/post/get/list', {params})
}