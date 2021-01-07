// 获取url参数
export function GetQueryValue(queryName, str) {
  var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
  var r = str.substr(1).match(reg);
  if(r != null) {
    return decodeURI(r[2]);
  }else {
    return null;
  }
}