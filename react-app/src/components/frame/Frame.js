 import React from "react";
import {withRouter} from 'react-router-dom'
import {adminRoutes} from "../../routes";
import {Layout, Menu, Breadcrumb, Dropdown, Avatar, message,Badge} from 'antd';
import "../../frame.css"
import {clearToken} from "../../units/auth";
import {connect} from "react-redux"

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter( route => route.isShow);

function Frame(props) {
    // console.log(props)
    const popMenu = (
        <Menu onClick={ (p) =>{
            if (p.key === "logout"){
                clearToken();
                props.history.push("/login")
            } else if (p.key === "notice"){
                    props.history.push("/admin/notice")
                } else{
                    message.info(p.key)  //tip,弹出一个提示
                }
        }}>
            <Menu.Item key="notice"><Badge dot={!props.isAllRead}>通知中心</Badge></Menu.Item>
            <Menu.Item key="set">设置</Menu.Item>
            <Menu.Item key="logout">退出</Menu.Item>
        </Menu>
    );


     return(
         <Layout>
             <Header className="header">
                 <div className="logo" >
                 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                     <Menu.Item key="1">nav 1</Menu.Item>
                     <Menu.Item key="2">nav 2</Menu.Item>
                     <Menu.Item key="3">nav 3</Menu.Item>
                 </Menu>
                 </div>
                 <Dropdown overlay={popMenu}>
                     <div>
                         <Avatar>M</Avatar>
                         <Badge dot={!props.isAllRead}>
                             <span>管理员</span>
                         </Badge>

                     </div>
                 </Dropdown>
             </Header>
             <Layout>
                 <Sider width={200} className="site-layout-background">
                     <Menu
                         mode="inline"
                         defaultSelectedKeys={['1']}
                         defaultOpenKeys={['sub1']}
                         style={{ height: '100%', borderRight: 0 }}>
                         {
                             routes.map( route =>{
                                 return ( <Menu.Item
                                     key={route.path}
                                     onClick={ p => props.history.push(p.key)}>
                                     {route.title}
                                 </Menu.Item>)
                             })
                         }
                         {/*</SubMenu>*/}
                     </Menu>
                 </Sider>

                 <Layout style={{ padding: '0 24px 24px' }}>
                     <Breadcrumb style={{ margin: '16px 0' }}>
                         <Breadcrumb.Item>Home</Breadcrumb.Item>
                         <Breadcrumb.Item>List</Breadcrumb.Item>
                         <Breadcrumb.Item>App</Breadcrumb.Item>
                     </Breadcrumb>
                     <Content
                         className="site-layout-background"
                         style={{
                             padding: 24,
                             margin: 0,
                             minHeight: 280,
                         backgroundColor:"white"}}>

                         {props.children}

                     </Content>
                 </Layout>
             </Layout>
         </Layout>
     )
 }
 const mapStateToProps = state => state.notices;  //当有两个reducer时
 export default connect(mapStateToProps) (withRouter(Frame));
 //因为Frame不是路由切换的组件  所以需要使用withRouter，使得Frame具有路由切换的三个属性 history match location