import axios from "axios"
import {getToken} from "../units/auth";

// 允许跨域设置，不然可能因为拿不到cookie而报错
axios.defaults.withCredentials = true;
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 8000
    });


//  全局请求拦截 发送请求之前执行
    instance.interceptors.request.use((config) => {
        config.headers["authorization"] = "Bearer" + getToken();
        return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error)
    });

// 响应拦截;请求返回之后执行
    instance.interceptors.response.use((res) => {
        return res.data;
    }, (err) => {
        console.log(err);
    });
    // 3、发送网络请求
    return instance(config)  //简写方式 返回的是promise
}



//get请求：
//url：请求地址
//params：url参数
// export function get(url,params) {
//     return instance.get(url,{
//         params
//     })
// }
//post请求：
//url：请求地址
//data：发送的数据
// export function post(url,data) {
//     return instance.get(url,data)
// }

// export function put(url,data) {
//     return instance.put(url,data)
// }

// export function del(url) {
//     return instance.delete(url)
// }