import service from "../utils/request";

/**
 * 添加部门
 * @param {*} data 
 */
export function DepartmentAddApi(data){
  return service.request({
    method:"post",
    url:"/department/add/",
    data
  })
}

/**
 * 获取部门列表数据
 * @param {*} data 
 */
export function GetList(data){
  return service.request({
    method:"post",
    url:"/department/list/",
    data
  })
}

/**
 * 删除
 * @param {*} data 
 */
export function Delete(data){
  return service.request({
    method:"post",
    url:"/department/delete/",
    data
  })
}

/**
 * 禁启用状态
 * @param {*} data 
 */
export function Status(data){
  return service.request({
    method:"post",
    url:"/department/status/",
    data
  })
}

/**
 * 详情
 * @param {*} data 
 */
export function Detailed(data){
  return service.request({
    method:"post",
    url:"/department/detailed/",
    data
  })
}

/**
 * 编辑
 * @param {*} data 
 */
export function DepartmentEditApi(data){
  return service.request({
    method:"post",
    url:"/department/edit/",
    data
  })
}