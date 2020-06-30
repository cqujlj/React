import {ListApi} from "../../networks/product";

export const loadProduct = (payload)=> async dispatch => {
    console.log(payload);
    const res = await ListApi;
    //当异步操作完成之后，通过dispatch触发reducer改变数据
    dispatch({
        type:'PRODUCT_LOADED',
        payload:{...res,page:payload.page}
    });
};