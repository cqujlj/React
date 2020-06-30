import React, {useEffect, useState} from "react";
import {Card,Table,Button,Popconfirm} from "antd"
import {connect} from "react-redux"
import {loadProduct} from "../../../store/actions/productAction";

function List(props) {
    const dataSource = [
        {
            id:1,
            name:"牛奶",
            price:5
        },
        {
            id:2,
            name:"苹果",
            price:3
        },
        {
            id:3,
            name:"饼干",
            price:8
        },
        {
            id:4,
            name:"可乐",
            price:3
        }];
    useEffect( ()=>{
        //把数据传入redux
        props.dispatch(
            loadProduct({
                page:2,
                name:"小米"
                        })
        )
    });
        /*  请求商品数据
        const [dataSource1,setDataSource] =useState([]);
        useEffect(()=>{
            ListApi().then(res =>{
                console.log("list请求成功",res);
                setDataSource(res.products);
            }).catch(err => {
                console.log(err)
            })
        },[]);

        const dataLoad =(page)=>{
            ListApi(page).then(res =>{
                console.log("list请求成功",res);
                setDataSource(res.products);
            }).catch(err => {
                console.log(err)
            })
        };
*/
    const dataLoad =(page)=>{
        console.log(page);
    };
    const columns = [
        {
            title:"序号",
            key:'_id',
            width:80,
            align:"center",
            render:(txt,record,index) => index+1
        },
        {
            title:"名字",
            dataIndex: "name"
        },
        {
            title:"价格",
            dataIndex: "price"
        },
        {
            title:"操作",
            render:(txt,record,index) => {
                return(
                    <div>
                        <Button style={{margin:"0 1rem"}}
                                type='primary'
                                size={"small"}
                                onClick={ ()=>{
                                    //点击修改进入Edit页面
                                    props.history.push(`/admin/products/edit/${record._id}`)
                                }}
                        >修改</Button>
                        <Popconfirm
                            title="确定删除？"
                            onCancel={ ()=>{ console.log("用户取消删除")}}
                            onConfirm={()=>{
                                console.log("用户确认删除")
                                //    此处调用API接口进行删除操作
                            }}>
                            <Button type='danger' size={"small"} style={{margin:"0 1rem"}}>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }];
    return(
        <Card
            title="商品列表"
            extra={<Button type='primary' size="small"
                           onClick={ ()=>{ props.history.push('/admin/products/edit')}}>
                新增
            </Button>}>
            {/*pagination：实现分页*/}
            <Table columns={columns}
                   rowKey = "id"
                   bordered
                   dataSource={dataSource}
                   pagination = {{total:4,defaultPageSize:2,onChange:dataLoad}}
            />
        </Card>
    )
}

export default connect(state => state.products)(List)