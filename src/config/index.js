/**
 * 环境配置封装
 * @type {string|string}
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev: {
        baseUrl: '',
        mockUrl: ''
    },
    test: {
        baseUrl: '',
        mockUrl: ''
    },
    prod: {
        baseUrl: '',
        mockUrl: ''
    }
}
export default {
    baseUrl: process.env.NODE_ENV === "production"? "https://api.limyel.com": "https://api.limyel.com"
}