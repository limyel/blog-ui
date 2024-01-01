import axios from "axios";
import config from "@/config";
import Cookies from 'js-cookie';

const request = axios.create({
  baseURL: config.baseUrl
})

request.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config
}, error => {
  return Promise.reject(error);
})

request.interceptors.response.use(resp => {
  return resp.data.data;
}, error => {

})

export default request;