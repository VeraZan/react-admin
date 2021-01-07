import cookies from 'react-cookies'

const token = 'reactAdminToken'
const user = 'reactAdminUser'


// 存储token
export function setToken(value) {
  cookies.save(token, value)
}

// 获取token
export function getToken() {
  return cookies.load(token)
}

// 存储用户名
export function setUsername(value) {
  cookies.save(user, value)
}

// 获取token
export function getUsername() {
  return cookies.load(user)
}
