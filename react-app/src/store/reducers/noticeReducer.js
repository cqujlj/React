const notices = (state = { isAllRead:false,count:8},action)=>{
    switch (action.type) {
        case "READ_ALL":
            return { ... state,isAllRead: true};   //改变isAllRead的值
        default:
            return state
    }
};
export default notices;