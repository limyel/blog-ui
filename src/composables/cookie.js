import {useCookies} from "@vueuse/integrations/useCookies";

const cookie = useCookies()


// ==================== Token 令牌 ====================
// 存储在 Cookie 中的 Token 的 Key
const TOKEN_KEY = 'Authorization'

// 获取 Token 值
export function getToken() {
    return cookie.get(TOKEN_KEY)
}

// 存储 Token 到 Cookie
export function setToken(token) {
    return cookie.set(TOKEN_KEY, token, {path: '/'})
}

// 删除 Token
export function removeToken() {
    return cookie.remove(TOKEN_KEY, {path: '/'})
}


// ==================== 标签 ====================
const TAB_LIST_KEY = 'tabList'

export function getTabList() {
    return cookie.get(TAB_LIST_KEY)
}

export function setTabList(tabList) {
    return cookie.set(TAB_LIST_KEY, tabList, {path: '/'})
}