const tokenAdmin = "reactAdminToken";
const collapsedAdmin = "reactAdminCollapsed";

export function setToken(value){
  sessionStorage.setItem(tokenAdmin,value);
}

export function getToken(){
  return sessionStorage.getItem(tokenAdmin);
}

export function setCollapsed(value){
  sessionStorage.setItem(collapsedAdmin,value);
}

export function getCollapsed(){
  return sessionStorage.getItem(collapsedAdmin);
}