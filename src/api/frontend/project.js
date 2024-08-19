import axios from "@/axios.js";

export function getProjectList() {
    return axios.get('/app/project/get/list')
}

