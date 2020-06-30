//修改redux中的数据，必须在reducer中进行

const products = (state ={list:[],page:1,total:0},action)=>{
    switch (action.type) {
        case "PRODUCT_LOADED":
            console.log(action);
            return {...state};
        default:
            return state;
    }
};
export default products;