import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Login from "./views/login/index";
import Index from "./views/index/index";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <HashRouter>
        <Switch>
          <Route component={Login} exact path="/" />
          <Route component={Index} exact path="/index" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;