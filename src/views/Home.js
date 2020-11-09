import React from 'react';
import { Button } from "antd";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <React.Fragment>
        <span className="red">Home</span>
        <Button type="primary">12</Button>
      </React.Fragment>
    )
  }
}

export default Home;