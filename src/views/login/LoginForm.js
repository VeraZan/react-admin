import React from "react";
//router
import { withRouter } from "react-router-dom";
//antd
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
//加密
import CryptoJs from "crypto-js";
//utils
import { reg_password } from "@/utils/validate";
//api
import { Login } from "@/api/account";
//组件
import Code from "@/components/code/index";
//session
import { setToken, setUsername } from "@/utils/cookies";
//i18n
import { withTranslation } from 'react-i18next';

// 除了第一个引用的命名空间，其余的使用时需要加上 命名空间：譬如{t('menu:aaa')}
// 如果t函数指定命名空间就使用指定命名空间下的语言，如果没有指定使用第一个命名空间的语言
@withTranslation(['common'])
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
      setUsername(data.data.username);
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
    const { t }  = this.props;
    return (
      <React.Fragment>
        <div className="form-header">
          <h4 className="column">{t('login')}</h4>
          <span onClick={this.toggleForm}>{t('account_register')}</span>
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
                {required: true,message: t('required_email')},
                {type:"email",message: t('pattern_email')},
              ]}
            >               
              <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('email')} />
            </Form.Item>
            <Form.Item 
              name="password" 
              rules={[
                {required: true,message: t('required_password')},
                // {min:6,message:"密码不能小于6位！"},
                // {max:20,message:"密码不能大于20位！"},
                {pattern: reg_password,message: t('pattern_password')}
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder={t('password')} />
            </Form.Item>    
            <Form.Item 
              name="code" 
              rules={[
                {required: true,message: t('required_code')},
                {len:6,message: t('len_code')}
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input prefix={<KeyOutlined className="site-form-item-icon" />} placeholder={t('code')} />
                </Col>
                <Col span={9}>
                  <Code username={username} module={module} />
                </Col>
              </Row>
            </Form.Item>         
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block>{t('login')}</Button>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(LoginForm);