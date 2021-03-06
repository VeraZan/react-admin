import React from "react";
//css
import "./index.scss";
//antd
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
//组件
import LayoutAside from "./components/aside";
import LayoutHeader from "./components/header";
import ContainerMain from "../../components/containerMain/index";
//sessionStorage
import { setCollapsed,getCollapsed } from "../../utils/session";

const { Header, Sider, Content } = Layout;

class Index extends React.Component {
  constructor(){
    super();
    this.state = {
      collapsed:false,
      locale: zhCN
    };
  }

  componentDidMount(){
    const collapsed = JSON.parse(getCollapsed());//因为getCollapsed()返回的true|false是字符串格式的，所以需要转换
    this.setState({ collapsed });
  }

  toggleCollapsed = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
    setCollapsed(collapsed);
  }

  render(){
    return (
      <ConfigProvider locale={this.state.locale}>
        <Layout className="layout-wrap">
          <Header className="layout-header">
            <LayoutHeader collapsed={this.state.collapsed} toggle={this.toggleCollapsed} />
          </Header>
          <Layout>
            <Sider width="250px" collapsed={this.state.collapsed}><LayoutAside /></Sider>
            <Content className="layout-main">
              <ContainerMain />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    )
  }
}

export default Index;