import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Login from "./views/login/index";
import Index from "./views/index/index";
import PrivateRouter from "./components/privateRouter/index";
import './i18n';

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
          <PrivateRouter component={Index} path="/index" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;