import React from "react";
//router
import { withRouter } from "react-router-dom";
//antd
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
//加密
import CryptoJs from "crypto-js";
//utils
import { reg_password } from "../../utils/validate";
//api
import { Login } from "../../api/account";
//组件
import Code from "../../components/code/index";
//session
import { setToken } from "../../utils/session";

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      module:"login",
      loading:false,
    };
  }

  form = React.createRef();

  onFinish = (values) => {
    const { username,password,code } = values;
    const requestData = {
      username,
      password:CryptoJs.MD5(password).toString(),
      code
    }
    this.setState({
      loading:true
    })
    Login(requestData).then(response => {
      this.setState({
        loading:false
      })
      const data = response.data;
      message.success(data.message);
      this.form.current.resetFields();
      setToken(data.data.token);
      this.props.history.push("/index");
    }).catch(error => {
      this.setState({
        loading:false
      })
    })
  }

  inputChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  toggleForm = () => {
    this.props.switchForm("register")
  }

  render(){
    const { username,module,loading } = this.state;
    return (
      <React.Fragment>
        <div className="form-header">
          <h4 className="column">登录</h4>
          <span onClick={this.toggleForm}>账号注册</span>
        </div>
        <div className="form-content">
          <Form
            ref={this.form} 
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }} 
            onFinish={this.onFinish}
          >
            <Form.Item 
              name="username" 
              rules={[
                {required: true,message: "邮箱不能为空!"},
                {type:"email",message: '邮箱格式有误!'},
              ]}
            >               
              <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱" />
            </Form.Item>
            <Form.Item 
              name="password" 
              rules={[
                {required: true,message: "密码不能为空!"},
                // {min:6,message:"密码不能小于6位！"},
                // {max:20,message:"密码不能大于20位！"},
                {pattern: reg_password,message:"密码为6-20位的数字+字母！"}
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
            </Form.Item>    
            <Form.Item 
              name="code" 
              rules={[
                {required: true,message: "验证码不能为空!"},
                {len:6,message:"请输入长度为6位的验证码！"}
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input prefix={<KeyOutlined className="site-form-item-icon" />} placeholder="验证码" />
                </Col>
                <Col span={9}>
                  <Code username={username} module={module} />
                </Col>
              </Row>
            </Form.Item>         
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(LoginForm);