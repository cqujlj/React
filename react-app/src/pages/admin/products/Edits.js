import React, {useState} from "react";
import {Form, Card, Input, Button, message} from "antd"
import {createApi} from "../../../networks/product";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

function Edits(props) {
   const [editorState,setEditorState] =  useState(BraftEditor.createEditorState(""));
    //富文本编辑器
    const handleEditorChange = (val) => {
        setEditorState(val)
    };

// props.match.id如果存在的话 表示修改 否则是新增
    const loadProduct = (value) =>{
        createApi(value).then( res =>{
            console.log("商品信息提交成功",res);
            props.history.push("/admin/products");
        }).catch( err =>{
            console.log(err);
        })
    };
    //点击保存，执行该函数
    const onFinish = values => {
        console.log(editorState.toHTML());  //获取富文本内容,可提交到服务器
        console.log('Received values of form: ', values);
    };

    return(
      <Card title="商品编辑">
          <Form  name="edit-products"
                 className="edit-products"
                 initialValues={{
                     remember: true,
                 }}
                 onFinish={onFinish}>

              <Form.Item  label="商品名称"
                          name="product_name"
                          rules={[
                              {
                                  required: true,
                                  type: 'string',
                                  message: 'Please input product name!',
                              },
                          ]}>
                  <Input placeholder="请输入商品名称" />
              </Form.Item>

              <Form.Item  label="商品价格"
                          name="product_price"
                          rules={[
                              {
                                  required: true,
                                  type: 'string',
                                  message: 'Please input product price!',
                              },
                          ]}>
                  <Input placeholder="请输入商品价格"/>
              </Form.Item>
              <Form.Item label="商品详情">
                  <BraftEditor
                      value={editorState}
                      onChange={ e => handleEditorChange(e)}
                  />
              </Form.Item>
              <Form.Item>
                  <Button  htmlType="submit" type="primary" onClick={loadProduct}>保存</Button>
              </Form.Item>
          </Form>
      </Card>
    )
}
export default Edits