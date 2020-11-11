import service from "../utils/request";

/**
 * 登录
 * @param {*} data 
 */
export function Login(data){
  return service.request({
    method:"post",
    url:"/login/",
    data
  })
}

/**
 * 注册
 * @param {*} data 
 */
export function Register(data){
  return service.request({
    method:"post",
    url:"/register/",
    data
  })
}

/**
 * 获取验证码
 * @param {*} data 
 */
export function GetCode(data){
  return service.request({
    method:"post",
    url:"/getSms/",
    data
  })
}