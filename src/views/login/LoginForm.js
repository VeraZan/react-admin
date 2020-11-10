import React from "react";
//antd
import { Form, Input, Button, Row, Col,message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
//utils
import { validate_password,validate_email } from "../../utils/validate";
//api
import { Login,GetCode } from "../../api/account";

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      code_button_text:"获取验证码",
      code_button_disabled:true,
      code_button_loading:false,

    };
  }

  onFinish = (values) => {
    Login(values).then(response => {

    })
  }

  getCode = () => {
    this.setState({
      code_button_text:"发送中",
      code_button_loading:true
    })
    const requestData = {
      username:this.state.username,
      module:"login"
    }
    GetCode(requestData).then(response => {
      const data = response.data;
      message.success(data.message);
      this.countDown();
    }).catch(error => {
      this.setState({
        code_button_text:"重新获取",
        code_button_loading:false
      })
    })
  }

  countDown = () => {
    let timer = null;
    let sec = 60;
    this.setState({
      code_button_loading:false,
      code_button_disabled:true,
      code_button_text:`${sec}s`
    })
    timer = setInterval(() => {
      sec--;
      if(sec <= 0){
        this.setState({
          code_button_disabled:false,
          code_button_text:"重新获取"
        })
        clearInterval(timer);
        return false;
      }
      this.setState({
        code_button_text:`${sec}s`
      })
    },1000)
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
    const { username,code_button_text,code_button_disabled,code_button_loading } = this.state;
    const _this = this;
    return (
      <React.Fragment>
        <div className="form-header">
          <h4 className="column">登录</h4>
          <span onClick={this.toggleForm}>账号注册</span>
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
                //{type:"email",message: '邮箱格式有误!'},
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
                // {min:6,message:"密码不能小于6位！"},
                // {max:20,message:"密码不能大于20位！"},
                {pattern: validate_password,message:"密码为6-20位的数字+字母！"}
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
                  <Button 
                    type="danger" 
                    className="get-code-button" 
                    onClick={this.getCode} 
                    disabled={code_button_disabled} 
                    loading={code_button_loading} 
                    block 
                  >{code_button_text}</Button>
                </Col>
              </Row>
            </Form.Item>         
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

export default LoginForm;