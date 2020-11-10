import React from "react";
//antd
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';

class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  }

  toggleForm = () => {
    this.props.switchForm("login")
  }

  render(){
    return (
      <React.Fragment>
        <div className="form-header">
          <h4 className="column">注册</h4>
          <span onClick={this.toggleForm}>账号登录</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }} 
            onFinish={this.onFinish}
          >
            <Form.Item name="username" rules={[{required: true,message: 'Please input your Username!'}]}>               
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{required: true,message: 'Please input your Password!'}]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>  
            <Form.Item name="passwords" rules={[{required: true,message: 'Please input your Passwords!'}]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Passwords" />
            </Form.Item>    
            <Form.Item name="code" rules={[{required: true,message: 'Please input your code!'}]}>
              <Row gutter={13}>
                <Col span={15}>
                  <Input prefix={<KeyOutlined className="site-form-item-icon" />} placeholder="code" />
                </Col>
                <Col span={9}>
                  <Button type="danger" className="get-code-button" block>获取验证码</Button>
                </Col>
              </Row>
            </Form.Item>         
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

export default RegisterForm;