import service from "@/utils/request"

//获取表格数据
export function loadTableData(params) {
  return service.request({
    method: params.method || "post",
    url: params.url,
    data: params.data || {}
  })
}