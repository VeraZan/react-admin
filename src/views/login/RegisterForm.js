import React from "react";
//antd
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
//加密
import CryptoJs from "crypto-js";
//utils
import { validate_password } from "@/utils/validate";
//api
import { Register } from "@/api/account";
//组件
import Code from "@/components/code/index";
//i18n
import { withTranslation } from 'react-i18next';

@withTranslation(['common'])
class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      module:"register",
      loading:false,
    };
  }

  form = React.createRef();

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
      this.form.current.resetFields();
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
    const { username,module,loading } = this.state;
    const { t } = this.props
    return (
      <React.Fragment>
        <div className="form-header">
          <h4 className="column">{t('register')}</h4>
          <span onClick={this.toggleForm}>{t('account_login')}</span>
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
                {type:"email",message: t('pattern_email')}
              ]}
            >               
              <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('email')} />
            </Form.Item>
            <Form.Item 
              name="password" 
              rules={[
                {required: true,message: t('required_password')},
                ({ getFieldValue }) => ({
                  validator(rule,value){
                    const passwords_value = getFieldValue("passwords");
                    if(!validate_password(value)){
                      return Promise.reject(t('pattern_password'));
                    }
                    if(passwords_value && value !== passwords_value){
                      return Promise.reject("两次输入密码不一致！");
                    }
                    return Promise.resolve();
                  }
                })
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder={t('password')} />
            </Form.Item>  
            <Form.Item 
              name="passwords" 
              rules={[
                {required: true,message: t('required_passwords')},
                ({ getFieldValue }) => ({
                  validator(rule,value){
                    if(value !== getFieldValue("password")){
                      return Promise.reject(t('different_passwords'));
                    }
                    return Promise.resolve();
                  }
                })
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder={t('passwords')} />
            </Form.Item>     
            <Form.Item 
              name="code" 
              rules={[
                {required: true,message: t('required_code')},
                {len:6,message:t('len_code')}
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
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block>{t('register')}</Button>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

export default RegisterForm;