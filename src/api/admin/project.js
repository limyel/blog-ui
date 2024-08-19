import axios from "@/axios.js";

export function getProjectPage(params) {
    return axios.get('/admin/project/get/page', {params: params})
}

export function createProject(data) {
    return axios.post('/admin/project/create', data)
}