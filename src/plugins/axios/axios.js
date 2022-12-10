import axios from 'axios'

axios.defaults.baseURL = 'http://120.46.201.113:6001'

// 如果请求话费了超过 `timeout` 的时间，请求将被中断s
axios.defaults.timeout = 10800000;
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false;
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;';
// 允许跨域
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log("error");
        return Promise.reject(error);
    }
);
export default axios
