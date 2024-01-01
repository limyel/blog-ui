import request from "@/request";

export function getSysNowList(params) {
    return request.get('/sys/now', {params: params});
}

export function getSysNow(id) {
    return request.get('/sys/now/' + id);
}

export function addNow(data) {
    return request.post('/sys/now', data);
}

export function updateNow(data) {
    return request.put('/sys/now', data);
}

export function deleteNow(id) {
    return request.delete('/sys/now/' + id);
}


export function getNow() {
    return request.get('/now');
}