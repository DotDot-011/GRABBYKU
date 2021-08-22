import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Login from './component_login/login';
import Driver from './components_driver/Driver';
import User from './components_user/User';

export default function App() {

    return (
      
        <Switch>
          <Route path="/" exact>
            <Login/>
          </Route>
          <Route path="/user" >
            
            <User/>
          </Route>
          <Route path="/driver">
            <Driver/>
            {/* hello my friend I'm ice &  write it*/}
          </Route>
        </Switch>
      
    )
}

