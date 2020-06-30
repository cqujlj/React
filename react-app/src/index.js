import React from 'react';
import ReactDom from "react-dom"
import {BrowserRouter,Route,Redirect,Switch} from "react-router-dom"
import './index.css';
import 'antd/dist/antd.css'
import App from './App';
import {Provider} from "react-redux"
import store from "./store/store";
import {adminRoutes, mainRoutes} from "./routes";
import * as serviceWorker from './serviceWorker';

ReactDom.render(
    <Provider store={store}>  {/* 将store的数据放到了整个项目中，一个项目只有一个store*/}
        <BrowserRouter>
            <Switch>
                <Route path='/admin' render = { routeProps => <App {...routeProps}/>}/>
                {
                    mainRoutes.map( (route) =>{
                        return <Route key={route.path} path={route.path} component={route.component}/>
                    })
                }
                <Redirect from={adminRoutes[0].path} to='/admin'/>
                <Redirect to='/404'/>
            </Switch>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
