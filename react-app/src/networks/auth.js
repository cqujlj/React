import {request} from "./requrie";

/*
* 用户登录 username  password
*/

//发送登录请求
export function sendLogin(phone,password) {
    return request({
        url:'/login/cellphone',
        params:{
            phone:phone,
            password:password
        }
    })
}