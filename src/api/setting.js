import request from "@/request";

export function getSysSetting() {
    return request.get('/sys/setting');
}

export function updateSetting(data) {
    return request.put('/sys/setting', data)
}

export function getAbout() {
    return request.get('/setting/about');
}