import React, { Component,Fragment } from 'react';
//antd
import { Menu } from 'antd';
import  * as Icon from '@ant-design/icons';
//router
import { Link,withRouter } from "react-router-dom";
//路由
import Router from "../../router/index";

const { SubMenu } = Menu;

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedKeys:[],
      openKeys:[]
    }
  }

  componentDidMount(){
    const pathname = this.props.location.pathname;
    const pathArr = pathname.split("/");
    /**当存在三级目录时 */
    // let menuKey = [];
    // for(let i = pathArr.length - 1;i > 1;i--){
    //   menuKey.push(pathArr.slice(0,i).join("/"));
    // }
    // const menuHigh = {
    //   selectedKeys:[pathname],
    //   openKeys:menuKey
    // }
    /**只存在二级目录时 */
    let menuKey = pathArr.slice(0,pathArr.length - 1).join("/");
    const menuHigh = {
      selectedKeys:[pathname],
      openKeys:[menuKey]
    }
    this.selectMenuHigh(menuHigh);
  }

  selectMenu = ({ item, key, keyPath, domEvent }) => {
    /**当存在三级目录时 */
    // const menuHigh = {
    //   selectedKeys:[key],
    //   openKeys:this.getOpenKeys(keyPath)
    // }
    /**只存在二级目录时 */
    const menuHigh = {
      selectedKeys:[key],
      openKeys:[keyPath[keyPath.length - 1]]
    }
    this.selectMenuHigh(menuHigh);
  }

  openMenu = (openKeys) => {
    /**当存在三级目录时 */
    // const menuHigh = {
    //   openKeys:this.getOpenKeys(openKeys)
    // }
    /**只存在二级目录时 */
    const menuHigh = {
      openKeys:[openKeys[openKeys.length - 1]]
    }
    this.selectMenuHigh(menuHigh);
  }

  // getOpenKeys = (keyPath) => {
  //   let menuKey = [];
  //   for(let i = keyPath.length-1;i >= 0;i--){
  //     menuKey.push(keyPath[i]);
  //   }
  //   return menuKey;
  // }

  selectMenuHigh = (params) => {
    this.setState(params)
  }

  //有子级菜单处理
  renderSubMenu = ({ title,key,children,icon }) => {
    return (
      <SubMenu 
        key={key} 
        icon={icon && icon !== "" ? React.createElement(Icon[icon]) : ""} 
        title={title}
      >
        {
          children && children.map(item => {
            return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item); 
          })
        }
      </SubMenu>  
    )
  }
  //无子级菜单处理
  renderMenu = ({ title,key,icon }) => {
    return (
      <Menu.Item 
        key={key} 
        icon={icon && icon !== "" ? React.createElement(Icon[icon]) : ""}
      >
        <Link to={key} replace>{title}</Link>
      </Menu.Item>
    )
  }

  render() { 
    const {selectedKeys,openKeys} = this.state;
    return (  
      <Fragment>
        <Menu
          theme="dark" 
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys} 
          onClick={this.selectMenu} 
          onOpenChange={this.openMenu} 
          style={{ height: '100%', borderRight: 0, overflowY: 'auto' }}
        >
          {
            Router && Router.map(firstItem => {
              return firstItem.children && firstItem.children.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem); 
            })
          }        
        </Menu>
      </Fragment>
    )
  }
}
 
export default withRouter(AsideMenu);