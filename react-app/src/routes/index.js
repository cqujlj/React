// 配置路由
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import List from "../pages/admin/products/List";
import Edits from "../pages/admin/products/Edits";
import Index from "../pages/admin/dashboard/Index";
import Notice from "../pages/admin/notices/Notice";
export const mainRoutes = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/404',
        component:PageNotFound
    }
];
export const adminRoutes = [
    {
        path:'/admin/dashboard',
        component:Index,
        isShow:true,
        title:"看板"
    },
    {
        path:'/admin/products',
        component:List,
        exact:true,
        isShow:true,
        title:"商品管理"
    },
    {
        path:'/admin/products/:id',
        component:Edits,
        exact:true,
        isShow:false
    },
    {
        path:'/admin/notice',
        component:Notice,
        isShow:false
    }
];