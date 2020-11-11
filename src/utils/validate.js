export const reg_password = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
export const reg_email = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

/**
 * 验证邮箱
 * @param {*} value 
 */
export function validate_email(value){
  return reg_email.test(value)
}

/**
 * 验证密码
 * @param {*} value 
 */
export function validate_password(value){
  return reg_password.test(value)
}