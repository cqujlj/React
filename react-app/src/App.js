import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom"
import './App.css'
import {adminRoutes} from "./routes";
import Frame from "./components/frame/Frame";
import {isLogined} from "./units/auth";

function App() {
  return (
      // isLogined()?
    <Frame>
        <Switch>
            {
                adminRoutes.map( (route)=>{
                   return <Route
                       key = {route.path}
                       path = {route.path}
                       exact = {route.exact}
                       render={(routeProps) =>{
                           return <route.component {...routeProps}/>
                       }
                       }
                   />
                }
                )
            }
            <Redirect to='/404'/>
        </Switch>
    </Frame>
      // : <Redirect to='/login'/>
  );
}

export default App;
