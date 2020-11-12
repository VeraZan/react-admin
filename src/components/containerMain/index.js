import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
//私有路由
import PrivateRouter from "../privateRouter/index";
//自动化
import Components from "./components";

class ContainerMain extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <Switch>
        {
          Components.map(item => {
            return <PrivateRouter exact key={item.path} path={item.path} component={item.component} />
          })
        }
      </Switch>
    )
  }
}
 
export default ContainerMain;