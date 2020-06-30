import React from "react";
import { Form, Input, Button, Checkbox ,Card,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../login.css'
import {setToken} from "../units/auth";
import {sendLogin} from "../networks/auth";

function Login(props) {
    const onFinish = values => {
        console.log('Received values of form: ', values);
        // setToken(values.username);
        // props.history.push('/admin');
        sendLogin(values.username,values.password)
            .then( res =>{
                if (res.code === "success"){
                    res.header('Access-Control-Allow-Headers', ['myToken','Content-Type']);
                    setToken(res.token);
                    props.history.push('/admin');
                }else{
                    message.info("登录失败",res.message)
                }
            })
            .catch( err =>{
                message.info("用户不存在");
                console.log(err);
            })
    };
    return(
     <Card title="OF Admin SYS" className="login-card">
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}>
            <Form.Item
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone!',
                    },
                ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                       placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"/>
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="">register now!</a>
            </Form.Item>
        </Form>
        </Card>
    )
}
// export default Form.create()(Login)  //版本问题不能使用create  可修改为3.26.14
export default Login;