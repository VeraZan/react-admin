import React from "react";
//antd
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
//加密
import CryptoJs from "crypto-js";
//utils
import { validate_password,validate_email } from "../../utils/validate";
//api
import { Register } from "../../api/account";
//组件
import Code from "../../components/code/index";

class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      code_button_disabled:true,
      module:"register",
      loading:false,
    };
  }

  inputChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

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
    Register(requestData).then(response => {
      this.setState({
        loading:false
      })
      const data = response.data;
      message.success(data.message);
      this.toggleForm();
    }).catch(error => {
      this.setState({
        loading:false
      })
    })
  }

  toggleForm = () => {
    this.props.switchForm("login")
  }

  render(){
    const { username,module,code_button_disabled,loading } = this.state;
    const _this = this;
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
            <Form.Item 
              name="username" 
              rules={[
                {required: true,message: "邮箱不能为空!"},
                () => ({
                  validator(rule,value) {
                    if(validate_email(value)) {
                      _this.setState({
                        code_button_disabled:false
                      })
                      return Promise.resolve();
                    }else{
                      _this.setState({
                        code_button_disabled:true
                      })
                      return Promise.reject("邮箱格式有误!");
                    }                  
                  }
                })
              ]}
            >               
              <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱" />
            </Form.Item>
            <Form.Item 
              name="password" 
              rules={[
                {required: true,message: "密码不能为空!"},
                ({ getFieldValue }) => ({
                  validator(rule,value){
                    const passwords_value = getFieldValue("passwords");
                    if(!validate_password(value)){
                      return Promise.reject("密码为6-20位的数字+字母！");
                    }
                    if(passwords_value && value !== passwords_value){
                      return Promise.reject("两次输入密码不一致！");
                    }
                    return Promise.resolve();
                  }
                })
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
            </Form.Item>  
            <Form.Item 
              name="passwords" 
              rules={[
                {required: true,message: "确认密码不能为空!"},
                ({ getFieldValue }) => ({
                  validator(rule,value){
                    if(value !== getFieldValue("password")){
                      return Promise.reject("两次输入密码不一致！");
                    }
                    return Promise.resolve();
                  }
                })
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="确认密码" />
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
                  <Code username={username} module={module} code_button_disabled={code_button_disabled} />
                </Col>
              </Row>
            </Form.Item>         
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block>注册</Button>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

export default RegisterForm;