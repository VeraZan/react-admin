import React, { Component } from 'react';
//antd
import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons';
//css
import "./header.scss";

class LayoutHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      collapsed:props.collapsed
    }
  } 

  // 生命周期，监听父级 props 的值变化
  // componentWillReceiveProps({ collapsed }){
  //   this.setState({
  //     collapsed
  //   })
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { collapsed } = nextProps;
    // 当传入的props中的指定值发生变化的时候，更新state
    if (collapsed !== prevState.collapsed) {     
      return {
        collapsed
      };
    }   
    // 否则，对于state不进行任何操作
    return null;
  }

  toggleMenu = () => {
    this.props.toggle();
  }

  render() { 
    const { collapsed } = this.state;
    return (  
      <div className={collapsed ? "collapsed-close" : ""}>
        <h1 className="logo">
          <span></span>
        </h1>
        <div className="header-wrap">
          <span className="collapsed-icon" onClick={this.toggleMenu}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </span>
        </div>
      </div>
    )
  }
}
 
export default LayoutHeader;