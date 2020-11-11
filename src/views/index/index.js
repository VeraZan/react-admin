import React from "react";
//css
import "./index.scss";
//antd
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

class Index extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return (
      <Layout className="layout-wrap">
        <Sider width="250px">
          菜单
        </Sider>
        <Layout>
          <Header className="layout-header">头</Header>
          <Content className="layout-main">内容</Content>
        </Layout>
      </Layout>
    )
  }
}

export default Index;