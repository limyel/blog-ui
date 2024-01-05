import request from "@/request";

export function login(username, password) {
    return request.post('/sys/admin/login', {username: username, password: password});
}

export function getAbout() {
    return request.get('/sys/admin/about');
}

export function getSysAbout() {
    return request.get('/sys/admin/sys-about');
}

export function updateAbout(about) {
    return request.put('/sys/admin/about', {about: about});
}

export function logout() {
    return request.get('/sys/logout');
}