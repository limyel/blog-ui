import request from "@/request";

export function login(username, password) {
    return request.post('/sys/user/login', {username: username, password: password});
}

export function logout() {
    return request.get('/sys/user/logout');
}