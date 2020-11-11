import React from "react";
//antd
import { Button,message } from "antd";
//api
import { GetCode } from "../../api/account";
//定时器
let timer = null;

class Code extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:props.username,
      module:props.module,
      code_button_text:"获取验证码",
      code_button_disabled:props.code_button_disabled,
      code_button_loading:false
    }
  }

  // 监听父组件传来的props值的变化
  // 方式一：componentWillReceiveProps（新版react已废弃）
  componentWillReceiveProps(value){
    if(!value.code_button_disabled){
      clearInterval(timer);
      this.setState({
        code_button_text:"获取验证码"
      })
    }
    this.setState({
      username:value.username,
      code_button_disabled:value.code_button_disabled
    })
  }
  // 方式二：getDerivedStateFromProps,有bug
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // 当传入的props中的指定值发生变化的时候，更新state
  //   if (nextProps.username !== prevState.username || 
  //     nextProps.code_button_disabled !== prevState.code_button_disabled) {
  //     return {
  //       username: nextProps.username,
  //       code_button_disabled: nextProps.code_button_disabled
  //     };
  //   }   
  //   // 否则，对于state不进行任何操作
  //   return null;
  // }

  //组件销毁前
  componentWillUnmount(){
    clearInterval(timer);
  }

  //点击获取验证码
  getCode = () => {
    this.setState({
      code_button_text:"发送中",
      code_button_loading:true
    })
    const requestData = {
      username:this.state.username,
      module:this.state.module
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

  //倒计时
  countDown = () => {   
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

  render(){
    const { code_button_text,code_button_disabled,code_button_loading } = this.state;
    return (
      <Button 
        type="danger" 
        className="get-code-button" 
        onClick={this.getCode} 
        disabled={code_button_disabled} 
        loading={code_button_loading} 
        block 
      >{code_button_text}</Button>
    )
  }
}

export default Code;