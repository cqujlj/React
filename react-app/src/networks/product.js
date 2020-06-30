import {request} from "./requrie";

// 请求商品列表
export function ListApi(page=1) {
    return request({
        url:'/admin/products',
        page:page
    })
}
//添加商品数据
export function createApi(data) {
    return request({
        url:'/admin/edit',
        data:data
    })
}
//修改商品数据 根据id获取数据，对数据进行修改
export function modifyApi(id) {
    return request({
        url:'/admin/modify',
        id:id
    })
}