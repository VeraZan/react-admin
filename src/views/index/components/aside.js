import React, { Component } from 'react';
//组件
import AsideMenu from "../../../components/asideMenu/index";
//css
import "./aside.scss";

class LayoutAside extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    return (
      <AsideMenu></AsideMenu>
    )
  }
}
 
export default LayoutAside;