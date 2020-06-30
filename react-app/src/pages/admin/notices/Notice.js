import React from "react";
import {List,Card,Typography,Button} from "antd"
import '../../../notice.css'
import {connect} from "react-redux"


function Notice(props) {
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];
    return(
       <Card title="消息列表"
             extra={<Button onClick={()=>{
                 props.dispatch({
                     type:"READ_ALL"
                 })}}>
                 全部已读</Button>}>
           <List
               header={<div>Header</div>}
               footer={<div>Footer</div>}
               bordered
               dataSource={data}
               renderItem={item => (
                   <List.Item className="list-item">
                       <Typography.Text mark>[ITEM]</Typography.Text> {item}
                       <Button size="small">已读</Button>
                   </List.Item>
               )}
           />
       </Card>
    )
}

export default connect(state=> state)(Notice);